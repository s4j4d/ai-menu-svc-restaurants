// import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IdentifiableDto } from '../../utils/dtos/identifiable.dto';
import { Metadata } from '../../utils/interfaces/metadata.interface';
import { Type } from 'class-transformer';

export class GetUserRestaurantOrdersDto {
  @ValidateNested({ each: true })
  @Type(() => IdentifiableDto)
  @IsNotEmpty()
  @ApiProperty({
    description: 'restaurant id',
    example: '50c0aff9-991e-4dbe-adab-dac847fefca8',
  })
  restaurant: IdentifiableDto;

  @ValidateNested({ each: true })
  @Type(() => IdentifiableDto)
  @IsNotEmpty()
  @ApiProperty({
    description: 'user id',
    example: { id: '50c0aff9-991e-4dbe-adab-dac847fefca8' },
  })
  user: IdentifiableDto;

  @IsOptional()
  @ApiHideProperty()
  __meta?: Metadata;
}
