import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';
import { FileResponseDto } from 'src/modules/file/dtos/file-response.dto';
import { NoticeRequestDto } from './dtos/notice-request.dto';
import { NoticeResponseDto } from './dtos/notice-response.dto';

@Injectable()
export class NoticeService {
    constructor(
        private readonly prismService: PrismaService,
    ) {}

    async createNotice(NoticeRequestDto: NoticeRequestDto) {
        const { title, content, pinned, fileIds } = NoticeRequestDto;

        // get attached files and check if they exist
        const files = await this.prismService.file.findMany({
            where: {
                id: {
                    in: fileIds,
                },
            },
        });

        // Check if all files exist
        if (files.length !== fileIds.length) {
            throw new BadRequestException("존재하지 않는 파일이 포함되어 있습니다.");
        }


        // Create a new Notice
        const notice = await this.prismService.notice.create({
            data: {
                title,
                content,
                pinned,
                files: {
                    connect: fileIds.map((id) => ({ id })),
                },
            },

            // Include the files in the response
            include: {
                files: true
            },
        });

        // Return the NoticeResponseDto
        return this.mapToNoticeResponseDto(notice);

    

    
}

// Utility method to map the Notice model to NoticeResponseDto
private mapToNoticeResponseDto(notice): NoticeResponseDto {
    return {
      id: notice.id,
      title: notice.title,
      content: notice.content,
      pinned: notice.pinned,
      createdAt: notice.createdAt,
      updatedAt: notice.updatedAt,
      files: notice.files.map(file => this.mapToFileResponseDto(file)),
    };
  }

  // Utility method to map the File model to FileResponseDto
  private mapToFileResponseDto(file): FileResponseDto {
    return {
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
      noticeId: file.noticeId,
    };
  }
}