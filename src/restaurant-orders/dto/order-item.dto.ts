import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Metadata } from '../../utils/interfaces/metadata.interface';

export class OrderItemDto {
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
    description: 'The name of the item',
    example: 'cappuccino',
  })
  name: string;

  @IsOptional()
  @ApiProperty()
  __meta?: Metadata;
}
