import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class NoticeRequestDto {
    @ApiProperty({ example: "제목", description: "공지사항 제목" })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: "내용", description: "공지사항 내용" })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ example: true, description: "공지사항 고정 여부" })
    @IsNotEmpty()
    @IsBoolean()
    pinned: boolean;

    // 첨부파일 id 배열
    @ApiProperty({ example: [1, 2], description: "첨부파일 id 배열" })
    @IsOptional()
    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    @IsPositive({ each: true })
    fileIds: number[];
    
}