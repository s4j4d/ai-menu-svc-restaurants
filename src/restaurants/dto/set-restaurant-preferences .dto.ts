import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IdentifiableDto } from './identifiable.dto';
import { PreferenceDto } from './preference.dto';
import { Metadata } from '../../utils/interfaces/metadata.interface';

export class SetUserRestaurantPreferencesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: '50c0aff9-991e-4dbe-adab-dac847fefca8',
  })
  id: string;

  @ValidateNested()
  @Type(() => IdentifiableDto)
  @IsNotEmpty()
  @ApiProperty()
  user: IdentifiableDto;

  @ValidateNested({ each: true })
  @Type(() => PreferenceDto)
  @IsOptional()
  @ApiProperty()
  preferences?: PreferenceDto[];

  @IsOptional()
  @ApiHideProperty()
  __meta?: Metadata;
}
