import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';
import { PartnerType } from '../enum/partner.enum';

@Schema({ timestamps: true })
export class Partner {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: false, type: String })
  companyPath: string;

  @Prop({ required: true, type: String, enum: PartnerType })
  partnerType: PartnerType.SPONSOR;

  @Prop({
    required: true,
    ref: 'Event',
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  })
  eventId: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: true, type: Boolean })
  isActive: boolean = true;
}

export type PartnerDocument = Partner & Document;

export const PartnerSchema = SchemaFactory.createForClass(Partner);

export const PARTNER_MODEL = Partner.name;
