import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CustomHttpException } from 'src/core/exceptions';
import {
  COUPON_CODE_MODEL,
  CouponCodeDocument,
} from './entity/couponCode.entity';
import { AddCouponCodeDto } from './dto/add-coupon.dto';

@Injectable()
export class CouponCodeService {
  constructor(
    @InjectModel(COUPON_CODE_MODEL)
    private couponCodeModel: Model<CouponCodeDocument>,
  ) {}

  async addCouponCode(addCouponCodeDto: AddCouponCodeDto): Promise<any> {
    try {
      const newCouponCode = await this.couponCodeModel.create(addCouponCodeDto);
      return newCouponCode;
    } catch (error) {
      console.log('err', error);
      throw new CustomHttpException(error.message, error.status);
    }
  }
  async getCouponCodes(): Promise<any[]> {
    try {
      return this.couponCodeModel.find();
    } catch (error) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
  async deleteCouponCode(id: Types.ObjectId): Promise<any[]> {
    try {
      return this.couponCodeModel.findByIdAndDelete(id);
    } catch (error) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
}
