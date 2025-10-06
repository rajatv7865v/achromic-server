import { Inject, Module } from '@nestjs/common';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MEMBERSHIP_MODEL, MembershipSchema } from './entity/membership.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MEMBERSHIP_MODEL, schema: MembershipSchema }]),
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
})
export class MembershipModule {}
