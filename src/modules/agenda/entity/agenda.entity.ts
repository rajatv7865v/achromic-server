import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { SPEAKER_MODEL } from '../../speaker/entity/speaker.entity';

// Session sub-schema
@Schema({ _id: false })
export class Session {
  @Prop({ required: true, type: Number })
  id: number;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  time: string;

  @Prop({ required: true, type: String })
  duration: string;

  @Prop({ required: true, type: String })
  location: string;

  @Prop({ 
    required: true, 
    type: String,
    enum: ['keynote', 'panel', 'workshop', 'break', 'networking']
  })
  type: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ 
    required: true, 
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: SPEAKER_MODEL }], 
    default: [] 
  })
  speakers: mongoose.Types.ObjectId[];
}

@Schema({ timestamps: true })
export class Agenda {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  date: string;

  @Prop({ required: true, type: String })
  venue: string;

  @Prop({ required: true, type: String })
  location: string;

  @Prop({ 
    required: true, 
    type: [Session], 
    default: [] 
  })
  sessions: Session[];

  @Prop({ required: true, ref: 'Event', type: mongoose.Schema.Types.ObjectId })
  eventId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;
}

export type AgendaDocument = Agenda & Document;

export const AgendaSchema = SchemaFactory.createForClass(Agenda);

// Add indexes for better query performance
AgendaSchema.index({ eventId: 1 });
AgendaSchema.index({ date: 1 });
AgendaSchema.index({ isActive: 1 });

export const AGENDA_MODEL = Agenda.name;
