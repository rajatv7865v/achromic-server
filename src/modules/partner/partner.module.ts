import { Module } from '@nestjs/common';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { PARTNER_MODEL, PartnerSchema } from './entity/partner.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PARTNER_MODEL, schema: PartnerSchema }]),
  ],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class PartnerModule {}
