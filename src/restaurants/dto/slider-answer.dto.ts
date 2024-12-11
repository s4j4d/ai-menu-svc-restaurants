import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SliderAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 5 })
  answerNumber: number;
}
