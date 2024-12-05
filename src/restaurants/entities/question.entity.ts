import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionEntityDocument = QuestionEntity & Document;

@Schema({ collection: 'questions', timestamps: true })
export class QuestionEntity {

  @Prop({ required: true })
  _id: string;
  @Prop({ required: true })
  questionText: string; // The text of the question

  @Prop({
    required: true,
    enum: ['yes_no', 'slider', 'text'], // Enforces allowed question types
  })
  type: string; // The type of the question (e.g., yes/no, slider, text input)

  @Prop({ type: [String], default: null }) // Relevant for yes/no or multiple-choice questions
  options?: string[]; // E.g., ["Yes", "No"] or other choices

  @Prop({ type: Number, default: null }) // Relevant for sliders
  min?: number; // Slider minimum value

  @Prop({ type: Number, default: null }) // Relevant for sliders
  max?: number; // Slider maximum value

  @Prop({ type: String, default: null }) // Relevant for text input
  placeholder?: string; // Placeholder for text input fields

  @Prop({ default: false }) // Whether the question is required
  isRequired?: boolean;
}

export const QuestionEntitySchema = SchemaFactory.createForClass(QuestionEntity);