import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { IdentifiableDto } from './identifiable.dto';
import { Metadata } from '../../utils/interfaces/metadata.interface';

export class AddRestaurantMenuDto {
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
    description: 'The name of the food category',
    example: 'sea-food',
  })
  category: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'description',
    example: '',
    required: false,
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The restaurant menus belog to',
    example: { id: '3c1f5759-6481-466e-93cc-058b16541916' },
  })
  restaurant: IdentifiableDto;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The logo document id of the restaurant',
    example: 'e13bbf3a-07ec-45ae-bd1f-a682966f00ac',
    required: false,
  })
  logoId?: string;

  @IsOptional()
  @ApiProperty()
  __meta?: Metadata;
}
