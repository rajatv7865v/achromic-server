import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  Category,
  CATEGORY_MODEL,
} from 'src/modules/category/entity/categeory';

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  dateFrom: string;

  @Prop({ required: true, type: String })
  dateTo: string;

  @Prop({ required: true, type: String })
  bannerUrl: string;

  @Prop({ required: true, type: String })
  timeFrom: string;

  @Prop({ required: true, type: String })
  timeTo: string;

  @Prop({ type: String, unique: true, required: true })
  slug: string;

  @Prop({ type: String, unique: false, required: true })
  venue: string;

  @Prop({ type: String, unique: false, required: true })
  location: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: CATEGORY_MODEL }],
    default: [],
  })
  categories: mongoose.Types.ObjectId[];

  @Prop({ required: true, type: Boolean })
  isActive: boolean = true;
}

export type EventDocument = Event & Document;

// Interface for populated event with category details
export interface PopulatedEvent extends Omit<Event, 'categories'> {
  categories: Category[];
}

export const EventSchema = SchemaFactory.createForClass(Event);

// Add virtual populate for categories
EventSchema.virtual('populatedCategories', {
  ref: CATEGORY_MODEL,
  localField: 'categories',
  foreignField: '_id',
  justOne: false,
});

// Ensure virtual fields are serialized
EventSchema.set('toJSON', { virtuals: true });
EventSchema.set('toObject', { virtuals: true });

EventSchema.index({ slug: 1 }, { unique: true });

export const EVENT_MODEL = Event.name;
