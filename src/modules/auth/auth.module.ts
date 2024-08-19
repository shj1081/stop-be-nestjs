import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt/jwt.strategy";
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    
    JwtModule.register({
      secret: process.env.JWT_SECRET, // JWT 토큰의 비밀 키
      signOptions: { expiresIn: "1d" }, // 1일 동안 유효한 토큰
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
