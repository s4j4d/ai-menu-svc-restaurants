import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { PreferenceDto } from './preference.dto';
import { Metadata } from '../../utils/interfaces/metadata.interface';
import { IdentifiableDto } from '../../utils/dtos';

export class SetUserRestaurantPreferencesDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: '50c0aff9-991e-4dbe-adab-dac847fefca8',
  })
  id: string;

  @ValidateNested()
  @Type(() => IdentifiableDto)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user which we are setting the preferences for',
  })
  user: IdentifiableDto;

  @ValidateNested({ each: true })
  @Type(() => PreferenceDto)
  @IsOptional()
  @ApiProperty({
    description: 'preferences of the user',
    type: [PreferenceDto],
  })
  preferences?: PreferenceDto[];

  @IsOptional()
  @ApiHideProperty()
  __meta?: Metadata;
}
