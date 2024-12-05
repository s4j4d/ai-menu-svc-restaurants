import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class MenuItemEntity {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string; // Name of the food item

  @Prop({ required: false })
  description?: string; // Optional description of the food item

  @Prop({ required: true, min: 0 })
  price: number; // Price of the food item

  @Prop({ required: false, min: 0 })
  number?: number; // Whether the item is available

  @Prop({ required: false, min: 0 })
  calories?: number; // Optional calorie count
}
