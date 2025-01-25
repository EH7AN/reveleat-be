import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    // 1. Check if email is taken
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    // 2. Hash the password (salt rounds from config or fallback to 10)
    const saltRounds = +process.env.BCRYPT_SALT_ROUNDS || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Create user
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Generate tokens
    const tokens = this.generateTokens(user);

    // 5. Return sanitized user + tokens
    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ where: { email } });

    // single check for user existence + correct password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // generate tokens
    const tokens = this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  private generateTokens(user: User) {
    // add any additional claims if needed (e.g., user.role)
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: User) {
    // remove password, etc., from the plain object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user.get({ plain: true });
    return rest;
  }
}
