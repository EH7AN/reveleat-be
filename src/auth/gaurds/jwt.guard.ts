import { Injectable, ExecutionContext, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AUTH_ERROR_ENUM } from '../enums/auth.error.enum';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new HttpException(AUTH_ERROR_ENUM.INVALID_TOKEN, 401);
    }
    return user;
  }
}
