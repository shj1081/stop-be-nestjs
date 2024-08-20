import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '@prisma/client';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, // meta data를 가져오기 위한 reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // HTTP 요청 객체
    const request = context.switchToHttp().getRequest();

    // 허용되는 user type 을 decorator를 통해 가져옴
    const allowTypes: UserType[] = this.reflector.get(
      'types',
      context.getHandler(),
    );

    // request 의 user 객체에서 type을 가져옴
    const { UserType } = request.user;

    // 허용되지 않는 user type일 경우 예외 발생
    if (!allowTypes.includes(UserType))
      throw new ForbiddenException('올바른 접근이 아닙니다');

    return true;
  }
}
