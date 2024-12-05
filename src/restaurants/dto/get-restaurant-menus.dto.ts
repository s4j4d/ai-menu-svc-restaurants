import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Metadata } from '../../utils/interfaces/metadata.interface';

export class GetRestaurantMenusDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'restaurantId',
    example: '50c0aff9-991e-4dbe-adab-dac847fefca8',
  })
  restaurantId: string;

  @IsOptional()
  @ApiHideProperty()
  __meta?: Metadata;
}
