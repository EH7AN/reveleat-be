import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { TokenUserData } from './user.entity';

export const AuthUser = createParamDecorator(
  (_, context: ExecutionContext): TokenUserData => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    request.user.role = request.user.roles[process.env.CONTEXT];
    return request.user;
  },
);

export const AuthHTTPUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      request.user.role = request.user.roles[process.env.CONTEXT];
    }
    return request.user;
  },
);
