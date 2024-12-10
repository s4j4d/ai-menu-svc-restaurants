import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class YesNoAnswerDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'yes',
  })
  answerText?: string;
}
