import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Metadata } from '../../utils/interfaces/metadata.interface';

export class AddRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: '50c0aff9-991e-4dbe-adab-dac847fefca8',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the restaurant',
    example: 'chargoon company',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The phone number of the restaurant',
    example: '+98 21 84202',
    required: false,
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The fax number of the restaurant',
    example: '+98 21 84202',
    required: false,
  })
  fax?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The address of the restaurant',
    example: 'Tehran Province, Tehran, Boostan Dd. End, Iran',
    required: false,
  })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The logo document id of the restaurant',
    example: 'e13bbf3a-07ec-45ae-bd1f-a682966f00ac',
    required: false,
  })
  logoId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'province', example: 'Tehran' })
  province?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'city', example: 'Tehran' })
  city?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'postalCode', example: 'Tehran' })
  postalCode?: string;

  @IsOptional()
  @ApiProperty()
  __meta?: Metadata;
}
