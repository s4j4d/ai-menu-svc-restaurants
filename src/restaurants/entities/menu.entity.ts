import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MenuItemEntity } from './menu-item.entity';
import { IdentifiableDto } from '../dto';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class MenuEntity {
  @Prop({ required: true })
  _id: string;

  @Prop({ type: IdentifiableDto, required: true })
  restaurant: IdentifiableDto;

  @Prop({ required: true, unique: true })
  category: string; // Name of the food category (e.g., "Pizza", "Desserts")

  @Prop()
  description?: string; // Optional description for the category

  @Prop({ require: false })
  logoId?: string;

  @Prop({
    type: [MenuItemEntity],
    default: [],
    required: false,
    isRequired: true,
  })
  items?: MenuItemEntity[]; // Array of menu items
}

export type MenuEntityDocument = MenuEntity & Document;
export const MenuEntitySchema = SchemaFactory.createForClass(MenuEntity);
