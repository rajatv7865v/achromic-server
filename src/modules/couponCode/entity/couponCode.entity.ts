import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';

@Schema({ timestamps: true })
export class CouponCode {
  @Prop({ required: true, type: String })
  couponName: string;

  @Prop({ required: true, type: Number })
  discount: number;

  @Prop({ required: true, type: String })
  expirationDate: String;

  @Prop({ required: true, ref: 'Event', type: mongoose.Schema.Types.ObjectId })
  eventId: mongoose.Schema.Types.ObjectId;
}

export type CouponCodeDocument = CouponCode & Document;

export const CouponCodeSchema = SchemaFactory.createForClass(CouponCode);

export const COUPON_CODE_MODEL = CouponCode.name;
