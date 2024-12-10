import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableDto } from '../../utils/dtos';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class Preference {
  @Prop({ required: true })
  _id: string;

  @Prop({ type: IdentifiableDto, required: true, unique: true })
  question: IdentifiableDto; // Reference to the Question entity

  @Prop({ type: String, default: null }) // For text or yes/no answers
  answerText?: string; // The user's answer as text

  @Prop({ type: Number, default: null }) // For slider questions
  answerValue?: number; // The user's answer as a number (e.g., slider value)
}
