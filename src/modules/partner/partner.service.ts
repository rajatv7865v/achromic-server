import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PARTNER_MODEL, PartnerDocument } from './entity/partner.entity';
import { Model, Types } from 'mongoose';
import { CustomHttpException } from 'src/core/exceptions';
import { AddPartnerDto } from './dto/add-partner.dto';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(PARTNER_MODEL) private partnerModel: Model<PartnerDocument>,
  ) {}

  async addPartner(addPartnerDto: AddPartnerDto): Promise<PartnerDocument> {
    try {
      const newPartner =  await this.partnerModel.create(addPartnerDto);
      return newPartner;
    } catch (error) {
      console.log("err", error);
      throw new CustomHttpException(error.message, error.status);
    }
  }
  async getPartner(): Promise<any[]> {
    try {
      return this.partnerModel.find();
    } catch (error) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
  async deletePartner(id: Types.ObjectId): Promise<any[]> {
    try {
      return this.partnerModel.findByIdAndDelete(id);
    } catch (error) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
}
