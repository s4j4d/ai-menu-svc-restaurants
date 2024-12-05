import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Metadata } from '../../utils/interfaces/metadata.interface';
import { IdentifiableDto } from './identifiable.dto';
import { Type } from 'class-transformer';
import { MenuItemEntityDto } from './menu-item-entity.dto';

export class UpdateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'menu id',
    example: '50c0aff9-991e-4dbe-adab-dac847fefca8',
  })
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The restaurant menus belog to',
    example: { id: '3c1f5759-6481-466e-93cc-058b16541916' },
  })
  restaurant: IdentifiableDto;

  @ValidateNested()
  @Type(() => MenuItemEntityDto)
  @IsOptional()
  @ApiProperty({ description: 'menu items list' })
  item?: MenuItemEntityDto;

  @IsOptional()
  @ApiHideProperty()
  __meta?: Metadata;
}
