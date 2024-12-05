import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Metadata } from '../../utils/interfaces/metadata.interface';
import { IdentifiableDto } from './identifiable.dto';
import { Type } from 'class-transformer';

export class YesNoAnswerDto {
  @ValidateNested()
  @Type(() => IdentifiableDto)
  @IsNotEmpty()
  @ApiProperty()
  question: IdentifiableDto;

  @IsString()
  @ApiProperty()
  answerText?: string;

  @IsOptional()
  @ApiHideProperty()
  __meta?: Metadata;
}
