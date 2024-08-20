import { Module } from '@nestjs/common';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

@Module({
  providers: [NoticeService, JwtStrategy],
  controllers: [NoticeController]
})
export class NoticeModule {}
