import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.model';
import { LoginResponse, RegisterResponse } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    name: string,
    password: string,
    mobile: string,
    // email?: string | null,
  ): Promise<RegisterResponse> {
    // 1. Check if email is taken
    const existingUser = await this.userModel.findOne({
      where: { phone_number: mobile },
    });
    if (existingUser) {
      throw new BadRequestException('phone_number is already in use');
    }

    // 2. Hash the password (salt rounds from config or fallback to 10)
    const saltRounds = +process.env.BCRYPT_SALT_ROUNDS || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Create user
    const user = await this.userModel.create({
      name,
      // email,
      mobile,
      password: hashedPassword,
    });

    // 4. Generate tokens
    const tokens = this.generateTokens(user);

    // 5. Return sanitized user + tokens
    return {
      user: this.sanitizeUser(user) as User,
      ...tokens,
    };
  }

  async login(mobile: string, password: string): Promise<LoginResponse> {
    const user = await this.userModel.findOne({ where: { mobile } });

    // single check for user existence + correct password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // generate tokens
    const tokens = this.generateTokens(user);

    return {
      user: this.sanitizeUser(user) as User,
      ...tokens,
    };
  }

  private generateTokens(user: User) {
    const payload = { sub: user.id, mobile: user.mobile };

    // Ensure the JWT_SECRET environment variable is available
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Generate access and refresh tokens
    const accessToken = this.jwtService.sign(payload, {
      secret: secretKey,
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: secretKey,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: User) {
    // remove password, etc., from the plain object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user.get({ plain: true });
    return rest;
  }
}
