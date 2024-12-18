import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class SliderAnswerDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'id of the slider',
    example: '14d21a4c-cfa5-438a-9866-49608d3d0a27',
  })
  id: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'answer for the slider in the form of number',
    example: 5,
  })
  answerValue: number;
}
