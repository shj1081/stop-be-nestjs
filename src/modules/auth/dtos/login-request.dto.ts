import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginRequestDto {
  @ApiProperty({ example: "admin", required: true })
  @IsNotEmpty()
  @IsString()
  loginId: string;
}