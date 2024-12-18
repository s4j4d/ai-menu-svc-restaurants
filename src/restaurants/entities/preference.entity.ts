import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableDto } from '../../utils/dtos';
import { SliderAnswerDto } from '../dto/slider-answer.dto';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class Preference {
  @Prop({ required: true })
  _id: string;

  @Prop({ type: IdentifiableDto, required: true, unique: true })
  question: IdentifiableDto; // Reference to the Question entity

  @Prop({ type: String, default: null }) // For text or yes/no answers
  answerText?: string; // The user's answer as text

  @Prop({ type: Array<SliderAnswerDto>, default: null }) // For slider questions
  answerValues?: SliderAnswerDto[]; // The user's answer as a number (e.g., slider value)
}
