import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { IdentifiableDto } from './identifiable.dto';
import { SliderAnswerDto } from './slider-answer.dto';
import { UserInputAnswerDto } from './user-input-answer.dto';
import { YesNoAnswerDto } from './yes-no-answer.dto';

export class PreferenceDto {
  @Type(() => IdentifiableDto)
  @IsNotEmpty()
  @ApiProperty()
  question: { id: string };

  @ValidateNested({ each: true })
  @Type(() => IdentifiableDto)
  @IsOptional()
  @ApiProperty()
  answers?: SliderAnswerDto[] | UserInputAnswerDto | YesNoAnswerDto;
}
