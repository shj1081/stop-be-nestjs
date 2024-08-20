import { ApiProperty } from "@nestjs/swagger";

export class FileResponseDto {
    
    @ApiProperty({ example: 1, description: "파일 id" })
    id: number;

    @ApiProperty({ example: "파일명", description: "파일명" })
    name: string;

    @ApiProperty({ example: "IMAGE", description: "MIME 타입" })
    mimeType: string;

    @ApiProperty({ example: "2021-08-01T00:00:00.000Z", description: "생성일" })
    createdAt: Date;

    @ApiProperty({ example: "2021-08-01T00:00:00.000Z", description: "수정일" })
    updatedAt: Date;

    @ApiProperty({ example: 1, description: "공지사항 id" })
    noticeId?: number;
    
}