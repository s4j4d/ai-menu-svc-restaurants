import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { SliderAnswerDto } from './slider-answer.dto';
import { UserInputAnswerDto } from './user-input-answer.dto';
import { YesNoAnswerDto } from './yes-no-answer.dto';
import { IdentifiableDto } from '../../utils/dtos';

export class PreferenceDto {
  @ValidateNested()
  @Type(() => IdentifiableDto)
  @IsNotEmpty()
  @ApiProperty({
    description: 'id of the question',
    example: { id: 'cd6bb0b3-41af-42b0-986a-3eb0747da771' },
  })
  question: IdentifiableDto;

  @ValidateNested({ each: true })
  @Type(() => IdentifiableDto)
  @IsOptional()
  @ApiProperty({
    description: 'list of the answers to this question',
    example: { id: 'cd6bb0b3-41af-42b0-986a-3eb0747da771' },
  })
  answers?: SliderAnswerDto[] | UserInputAnswerDto | YesNoAnswerDto;
}
