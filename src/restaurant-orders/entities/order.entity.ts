import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IdentifiableDto } from '../../utils/dtos';

// Enum for Order Status
export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

// Enum for Payment Status
export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export type RestaurantOrderEntityDocument = RestaurantOrderEntity & Document;

// Sub-document schema for Order Items
@Schema({ _id: false })
export class OrderItem {
  @Prop({ required: true })
  menuItem: IdentifiableDto; // Reference to the Menu Item in the restaurant

  @Prop({ required: true })
  quantity: number;
}

@Schema({ collection: 'orders', timestamps: true })
export class RestaurantOrderEntity {
  @Prop({ required: true })
  _id: string;

  @Prop({ type: IdentifiableDto, required: true })
  restaurant: IdentifiableDto;

  @Prop({ type: Array<IdentifiableDto>, required: true })
  users: IdentifiableDto[];

  @Prop({ required: true })
  tableNumber?: number;

  @Prop({ type: IdentifiableDto, required: false })
  address?: IdentifiableDto;

  @Prop({ required: true })
  totalAmount: number; // Total amount for the order

  @Prop({ type: Array<IdentifiableDto>, required: false })
  items?: IdentifiableDto[];

  @Prop({ required: false })
  status?: string;

  // @Prop({ required: false })
  // invoices?: Invoice[];

  @Prop({ enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus; // Payment status

  @Prop({ default: '' })
  specialRequests?: string; // Any special requests for the order

  @Prop({ type: Date, required: false })
  deletedAt?: Date;
}

const RestaurantOrderEntitySchema = SchemaFactory.createForClass(
  RestaurantOrderEntity,
);

RestaurantOrderEntitySchema.index({ 'restaurant.id': 1 });

export { RestaurantOrderEntitySchema };
