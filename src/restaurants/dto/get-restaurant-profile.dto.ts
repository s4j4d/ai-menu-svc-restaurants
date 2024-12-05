import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Metadata } from '../../utils/interfaces/metadata.interface';

export class GetRestaurantProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: '50c0aff9-991e-4dbe-adab-dac847fefca8',
  })
  id: string;

  @IsOptional()
  @ApiHideProperty()
  __meta?: Metadata;
}
