import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import { CommonResponseDto } from 'src/common/dtos/common-response.dto';
import { UseUserTypeGuard } from '../auth/decorators/user-type-guard.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { NoticeRequestDto } from './dtos/notice-request.dto';
import { NoticeResponseDto } from './dtos/notice-response.dto';
import { NoticeService } from './notice.service';

@Controller('notice')
@UseGuards(JwtGuard)
@ApiTags('공지사항 API')
@ApiExtraModels(CommonResponseDto)
@ApiInternalServerErrorResponse({ description: "서버 내부 오류" })
@ApiBearerAuth("access-token")
export class NoticeController {
    constructor(
        private readonly noticeService: NoticeService,
    ) {}

    @Post()
    @UseUserTypeGuard([UserType.ADMIN])
    @ApiOperation({ 
        summary: "공지사항 생성",
        description: "새로운 공지사항을 생성합니다."
    })
    @ApiBody({ type: NoticeRequestDto })
    @ApiResponse({
        description: "공지사항 생성 성공",
        status: 201,
        type: NoticeResponseDto,
    })
    async createNotice(@Body() noticeRequestDto: NoticeRequestDto) {
        const noticeResponse = await this.noticeService.createNotice(noticeRequestDto);
        return new CommonResponseDto(noticeResponse);
    }

}
