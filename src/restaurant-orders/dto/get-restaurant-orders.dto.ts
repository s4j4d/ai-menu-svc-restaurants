import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Metadata } from '../../utils/interfaces/metadata.interface';
import { IdentifiableDto } from '../../utils/dtos';
import { Type } from 'class-transformer';

export class GetRestaurantOrdersDto {
  @ValidateNested({ each: true })
  @Type(() => IdentifiableDto)
  @IsNotEmpty()
  @ApiProperty({
    description: 'restaurant id',
    example: '50c0aff9-991e-4dbe-adab-dac847fefca8',
  })
  restaurant: IdentifiableDto;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'restaurant id',
    example: 'pending',
  })
  ordersStatus?: string;

  @IsOptional()
  @ApiHideProperty()
  __meta?: Metadata;
}