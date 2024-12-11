import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserInputAnswerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'No I do not like horse piss' })
  answerText?: string;
}
