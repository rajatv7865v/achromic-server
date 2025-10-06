import { Module } from '@nestjs/common';
import { CouponCodeController } from './couponCode.controller';
import { CouponCodeService } from './couponCode.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import {
  COUPON_CODE_MODEL,
  CouponCodeSchema,
} from './entity/couponCode.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COUPON_CODE_MODEL, schema: CouponCodeSchema },
    ]),
  ],
  controllers: [CouponCodeController],
  providers: [CouponCodeService],
})
export class CouponCodeModule {}
