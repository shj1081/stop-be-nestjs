import { ApiProperty } from "@nestjs/swagger";
import { FileResponseDto } from "src/modules/file/dtos/file-response.dto";

export class NoticeResponseDto {

    @ApiProperty({ example: 1, description: "공지사항 id" })
    id: number;

    @ApiProperty({ example: "제목", description: "공지사항 제목" })
    title: string;

    @ApiProperty({ example: "내용", description: "공지사항 내용" })
    content: string;

    @ApiProperty({ example: true, description: "공지사항 고정 여부" })
    pinned: boolean;

    @ApiProperty({
        example: 
        {
            id: 1,
            name: "파일명",
            mimeType: "image/png",
            createdAt: "2021-08-01T00:00:00.000",
            updatedAt: "2021-08-01T00:00:00.000",
            noticeId: 1
        },
        description: "첨부파일" })
    files: FileResponseDto[];

    @ApiProperty({ example: "2021-08-01T00:00:00.000", description: "생성일" })
    createdAt: Date;

    @ApiProperty({ example: "2021-08-01T00:00:00.000", description: "수정일" })
    updatedAt: Date;
    
}