import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IdentifiableDto } from '../../utils/dtos';

export type RestaurantEntityDocument = RestaurantEntity & Document;

@Schema({ collection: 'restaurants', timestamps: true })
export class RestaurantEntity {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  phone?: string;

  @Prop({ required: false })
  fax?: string;

  @Prop({ required: false })
  address?: string;

  @Prop({ type: Array<string>, required: false })
  logoIds?: string[];

  @Prop({ required: false })
  province?: string;

  @Prop({ required: false })
  city?: string;

  @Prop({ required: false })
  postalCode?: string;

  @Prop({ required: false })
  status?: string;

  @Prop({ type: Date, required: false })
  deletedAt?: Date;
}

const RestaurantEntitySchema = SchemaFactory.createForClass(RestaurantEntity);

RestaurantEntitySchema.index({ name: 1 }, { unique: true });

export { RestaurantEntitySchema };
