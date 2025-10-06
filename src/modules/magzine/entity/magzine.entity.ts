import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  Category,
  CATEGORY_MODEL,
} from 'src/modules/category/entity/categeory';

@Schema({ timestamps: true })
export class Magzine {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  month: string;

  @Prop({ required: true, type: String })
  year: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  coverImage: string;

  @Prop({ required: true, type: String })
  downloadUrl: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: CATEGORY_MODEL }],
    default: [],
  })
  categories: mongoose.Types.ObjectId[];

  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;
}

export type MagzineDocument = Magzine & Document;

export const MagzineSchema = SchemaFactory.createForClass(Magzine);
export const MAGZINE_MODEL = Magzine.name;
