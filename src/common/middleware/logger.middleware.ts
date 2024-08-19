import { Inject, Injectable, Logger, LoggerService, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { Payload } from "src/modules/auth/jwt/jwt.payload";

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly jwt: JwtService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, headers } = req;
    const payload = headers.authorization
      ? <Payload>this.jwt.decode(headers.authorization)
      : null;
    const loginId = payload ? payload.loginId : 0;
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `USER-${loginId} [ ${method} ] ${originalUrl} // status : ${statusCode}`,
      );
    });

    next();
  }
}