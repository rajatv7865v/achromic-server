import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, type: String, unique: true })
  name: string;

  @Prop({ required: true, type: Boolean })
  isActive: boolean = true;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);

export const CATEGORY_MODEL = Category.name;
