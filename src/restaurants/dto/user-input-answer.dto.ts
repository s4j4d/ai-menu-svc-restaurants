import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UserInputAnswerDto  {
  @IsString()
  @IsOptional()
  @ApiProperty()
  answerText?: string;
}
