import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';

@Schema({ timestamps: true })
export class Membership {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, type: Number })
  strikeAmount: number;

  @Prop({ required: true, type: Number })
  duration: number;

  @Prop({ required: true, type: [String] })
  benefits: string[];
}

export type MembershipDocument = Membership & Document;

export const MembershipSchema = SchemaFactory.createForClass(Membership);

export const MEMBERSHIP_MODEL = Membership.name;
