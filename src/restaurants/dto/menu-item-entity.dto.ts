import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class MenuItemEntityDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string; // Name of the food item

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string; // Optional description of the food item

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number; // Price of the food item

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  number?: number; // Whether the item is available

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  calories?: number; // Optional calorie count

  @IsOptional()
  @ApiProperty({ required: false })
  logoIds?: Array<string>; // Optional description of the
}
