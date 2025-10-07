import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';

@Schema({ timestamps: true })
export class Speaker {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  designation: string;

  @Prop({ required: true, type: String })
  country: string;

  @Prop({ required: true, type: String })
  organization: string;
  @Prop({ required: true, type: String })
  avatar: string;

  @Prop({ required: true, type: String })
  linkedinUrl: string;

  @Prop({ required: true, ref: 'Event', type: mongoose.Schema.Types.ObjectId })
  eventId: mongoose.Schema.Types.ObjectId;
}

export type SpeakerDocument = Speaker & Document;

export const SpeakerSchema = SchemaFactory.createForClass(Speaker);
SpeakerSchema.index({ name: 1, eventId: 1 }, { unique: true });

export const SPEAKER_MODEL = Speaker.name;
