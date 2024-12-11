import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Metadata } from '../../utils/interfaces/metadata.interface';
import { SliderDto } from './slider.dto';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: '50c0aff9-991e-4dbe-adab-dac847fefca8',
  })
  questionId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The text of the question',
    example: 'Do you like red meat ?',
  })
  questionText: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      ' The type of the question (e.g., choice(mutiple-choice), slider, text input)',
    example: 'slider',
    required: true,
    enum: ['choice', 'slider', 'text'],
  })
  type: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Placeholder for text input fields',
    example: 'Enter your answer here ...',
    required: false,
  })
  placeholder?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description:
      'Relevant for yes/no or multiple-choice questions E.g., ["Yes", "No"] or other choices',
    example: '["Yes", "No"]',
  })
  options?: string[];

  @ValidateNested({ each: true })
  @IsOptional()
  @ApiProperty({
    description: 'Placeholder for text input fields',
    example: 'Enter your answer here ...',
    required: false,
  })
  sliders?: SliderDto[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Whether the question is required',
    example: 'true',
  })
  isRequired?: boolean;

  @IsOptional()
  @ApiProperty()
  __meta?: Metadata;
}