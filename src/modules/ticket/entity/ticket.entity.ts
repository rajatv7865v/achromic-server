import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EVENT_MODEL } from 'src/modules/event/entity/event.entity';

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number })
  strikePrice: number;

  @Prop({ required: false, type: Number })
  discount: number;

  @Prop({ required: false, type: String })
  discountName: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: EVENT_MODEL }],
    default: [],
  })
  events: mongoose.Types.ObjectId[];

  @Prop({ required: true, type: Boolean })
  isActive: boolean = true;
}

export type TicketDocument = Ticket & Document;

// Interface for populated ticket with event details
export interface PopulatedTicket extends Omit<Ticket, 'events'> {
  events: any[];
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

// Add virtual populate for events
TicketSchema.virtual('populatedEvents', {
  ref: EVENT_MODEL,
  localField: 'events',
  foreignField: '_id',
  justOne: false,
});

// Ensure virtual fields are serialized
TicketSchema.set('toJSON', { virtuals: true });
TicketSchema.set('toObject', { virtuals: true });

export const TICKET_MODEL = Ticket.name;
