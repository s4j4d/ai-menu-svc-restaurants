import { ApiProperty } from '@nestjs/swagger';
import { IdentifiableDto } from '../../utils/dtos';
import { OrderStatus, PaymentStatus } from '../entities/order.entity';

export class OrderItem {
  @ApiProperty({ required: true })
  menuItem: IdentifiableDto; // Reference to the Menu Item in the restaurant

  @ApiProperty({ required: true })
  quantity: number;
}

export class GetRestaurantOrdersResponseDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ type: IdentifiableDto, required: true })
  user: IdentifiableDto;

  @ApiProperty({ required: false })
  tableNumber?: number;

  @ApiProperty({ type: IdentifiableDto, required: false })
  address?: IdentifiableDto;

  @ApiProperty({ required: true })
  totalAmount: number; // Total amount for the order

  @ApiProperty({ type: Array<IdentifiableDto>, required: false })
  items?: OrderItem[];

  @ApiProperty({ required: false, enum: OrderStatus })
  status?: string;

  @ApiProperty({
    required: false,
    enum: PaymentStatus,
  })
  paymentStatus?: PaymentStatus; // Payment status

  @ApiProperty({ required: false })
  specialRequests?: string; // Any special requests for the order
}
