import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginResponse,
  RegisterResponse,
  LoggedUserResponse,
} from './auth.dto';
import { AuthUser } from 'src/users/user.decorator';
import { JwtAuthGuard } from './gaurds/jwt.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('mobile') mobile: string,
    @Args('password') password: string,
  ): Promise<LoginResponse> {
    return this.authService.login(mobile, password);
  }

  @Mutation(() => RegisterResponse)
  async signup(
    @Args('name') name: string,
    @Args('password') password: string,
    @Args('mobile') mobile: string,
  ): Promise<RegisterResponse> {
    return this.authService.register(name, password, mobile);
  }

  @Query(() => LoggedUserResponse)
  @UseGuards(JwtAuthGuard)
  async getLoggedUser(@AuthUser() user): Promise<LoggedUserResponse> {
    return this.authService.getLoggedUser(user.id);
  }
}
