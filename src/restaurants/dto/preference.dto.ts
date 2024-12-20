import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { IdentifiableDto } from '../../utils/dtos';
import { SliderAnswerDto } from './slider-answer.dto';

export class PreferenceDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'id of the preference',
    example: '14d21a4c-cfa5-438a-9866-49608d3d0a27',
  })
  _id: string;

  @ValidateNested()
  @Type(() => IdentifiableDto)
  @IsNotEmpty()
  @ApiProperty({
    description: 'id of the question',
    example: { id: '303bc3c7-e8c9-48a9-9e00-0a8219253227' },
    type: IdentifiableDto,
  })
  question: IdentifiableDto;

  @ValidateNested({ each: true })
  @Type(() => SliderAnswerDto)
  @IsOptional()
  @ApiProperty({
    description: 'list of the answers to this question',
    example: [
      {
        id: '057866cd-dcb5-4648-ab33-1c51ee5a1276',
        answerValue: 2,
      },
      {
        id: '057866cd-dcb5-4648-ab33-1c51ee5a1276',
        answerValue: 3,
      },
    ],
    type: [SliderAnswerDto],
  })
  answerValues?: SliderAnswerDto[];

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'answer for the yes or no ,or text input field',
    example: 'yes',
  })
  answerText?: string; // The user's answer as text
}
