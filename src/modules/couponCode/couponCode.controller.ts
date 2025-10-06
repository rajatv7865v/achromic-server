import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CouponCodeService } from './couponCode.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/core/pipe/parse-object-id.pipe';
import { Types } from 'mongoose';
import { AddCouponCodeDto } from './dto/add-coupon.dto';

@ApiTags('CouponCode')
@Controller('coupon-code')
export class CouponCodeController {
  constructor(private readonly couponCodeService: CouponCodeService) {}

  @HttpCode(201)
  @Post()
  addCouponCode(@Body() addCouponCodeDto: AddCouponCodeDto): Promise<any> {
    return this.couponCodeService.addCouponCode(addCouponCodeDto);
  }

  @HttpCode(200)
  @Get()
  getCouponCodes(): Promise<any> {
    return this.couponCodeService.getCouponCodes();
  }

  @ApiOperation({ summary: 'Delete Coupon Code by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Coupon Code ID' })
  @HttpCode(200)
  @Delete(':id')
  deleteCouponCode(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    return this.couponCodeService.deleteCouponCode(id);
  }
}
