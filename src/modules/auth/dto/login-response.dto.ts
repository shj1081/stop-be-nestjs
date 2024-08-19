import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dtos/swagger-response.dto";

export abstract class LoginResponseDto extends BaseResponseDto {
  @ApiProperty()
  accessToken: string;
}