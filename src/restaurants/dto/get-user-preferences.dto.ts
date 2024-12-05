// import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IdentifiableDto } from './identifiable.dto';
import { Metadata } from '../../utils/interfaces/metadata.interface';

export class GetUserRestaurantPreferencesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: { id: '50c0aff9-991e-4dbe-adab-dac847fefca8' },
  })
  user: IdentifiableDto;

  @IsOptional()
  @ApiHideProperty()
  __meta?: Metadata;
}
