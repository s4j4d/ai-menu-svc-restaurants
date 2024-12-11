import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class YesNoAnswerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'yes',
  })
  answerText?: string;
}
