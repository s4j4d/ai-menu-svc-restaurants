import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Preference } from './preference.entity';
import { IdentifiableDto } from '../../utils/dtos';

export type UserPreferencesEntityDocument = UserPreferencesEntity & Document;

@Schema({ collection: 'user-preferences', timestamps: true })
export class UserPreferencesEntity {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  user: IdentifiableDto; // ID of the user who answered the question

  @Prop({ type: [Preference], required: false })
  preferences?: Array<Preference>;

  @Prop({ required: false })
  status?: string;

  @Prop({ type: Date, required: false })
  deletedAt?: Date;
}

export const UserPreferencesEntitySchema = SchemaFactory.createForClass(
  UserPreferencesEntity,
);
UserPreferencesEntitySchema.index({ user: 1 }, { unique: true });
