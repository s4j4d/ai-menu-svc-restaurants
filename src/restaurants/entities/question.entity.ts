import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SliderEntity } from './slider.entity';

export type QuestionEntityDocument = QuestionEntity & Document;

@Schema({ collection: 'questions', timestamps: true })
export class QuestionEntity {
  @Prop({ required: true })
  _id: string;
  @Prop({ required: true })
  questionText: string; // The text of the question

  @Prop({
    required: true,
    enum: ['choice', 'slider', 'text-input'], // Enforces allowed question types
  })
  type: string; // The type of the question (e.g., choice(mutiple-choice), slider, text input)

  @Prop({ type: [String], default: null }) // Relevant for yes/no or multiple-choice questions
  options?: string[]; // E.g., ["Yes", "No"] or other choices

  @Prop({ type: Array<SliderEntity>, default: null })
  sliders?: SliderEntity[];

  @Prop({ type: String, default: null }) // Relevant for text input
  placeholder?: string; // Placeholder for text input fields

  @Prop({ default: false }) // Whether the question is required
  isRequired?: boolean;
}

export const QuestionEntitySchema =
  SchemaFactory.createForClass(QuestionEntity);
