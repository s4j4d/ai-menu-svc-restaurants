import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class SliderDto {
  // we added the id because there might be more than one slider for each question
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'id of the slider',
    example: '14d21a4c-cfa5-438a-9866-49608d3d0a27',
  })
  id: string;

  @IsOptional()
  @ApiProperty({
    description: 'id of the question',
    example: 'saltiness',
  })
  label?: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'min value of the slider',
    example: 10,
  })
  min: number;
  @IsNotEmpty()
  @ApiProperty({
    description: 'max value of the slider',
    example: 0,
  })
  max: number;
  @IsNotEmpty()
  @ApiProperty({
    description: 'steps in which the value of the slider increases',
    example: 0,
  })
  step: number;
  @IsOptional()
  @ApiProperty({
    description: 'scale of the slider',
    example: 'kilogram or gram',
  })
  scale?: string;
}
