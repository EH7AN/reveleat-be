import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse, RegisterResponse } from './auth.dto';

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
    // @Args('email') email?: string,
  ): Promise<RegisterResponse> {
    return this.authService.register(name, password, mobile);
  }
}
