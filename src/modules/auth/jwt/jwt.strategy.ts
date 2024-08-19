import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/config/database/prisma.service';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    // payload에 담긴 loginId로 user를 찾아 반환
    const user: User = await this.prismaService.user.findUnique({
      where: {
        loginId: payload.loginId,
      },
    });

    // user 가 없을 경우 예외 발생
    if (!user) {
      throw new UnauthorizedException('허용되지않은 user입니다');
    }

    return user;
  }
}
