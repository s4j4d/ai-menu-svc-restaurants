import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Metadata } from '../../utils/interfaces/metadata.interface';
import { IdentifiableDto } from '../../utils/dtos';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: '50c0aff9-991e-4dbe-adab-dac847fefca8',
  })
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'restaurant id',
    example: 'chargoon company',
  })
  restaurant: IdentifiableDto;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => IdentifiableDto)
  @ApiProperty({
    description: 'user object',
    example: { id: '8301e47e-4343-4a3f-bce5-7477c274bdf8' },
  })
  user: IdentifiableDto;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Table number',
    example: 10,
    required: false,
  })
  tableNumber?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The address of the restaurant',
    example: 'Tehran Province, Tehran, Boostan Dd. End, Iran',
    required: false,
  })
  address?: string;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => OrderItemDto)
  @ApiProperty({
    description: 'Order items',
    example: [
      { id: '589d34ac-2173-4b40-ba65-abceb185c560', name: 'قرمه سبزی' },
    ],
    required: false,
  })
  items?: OrderItemDto[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Special requests regarding, making of the food.',
    example: 'please use lots of spices',
  })
  specialRequests?: string; // Any special requests for the order

  @IsOptional()
  @ApiProperty()
  __meta?: Metadata;
}
