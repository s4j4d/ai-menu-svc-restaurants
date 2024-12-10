import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the restaurant',
    example: 'chargoon company',
  })
  restaurant: IdentifiableDto;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => IdentifiableDto)
  @ApiProperty({
    description: 'The phone number of the restaurant',
    example: '+98 21 84202',
    required: false,
  })
  users: IdentifiableDto[];

  @IsString()
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
    example: { id: '589d34ac-2173-4b40-ba65-abceb185c560' },
    required: false,
  })
  orderItems?: OrderItemDto[];

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
