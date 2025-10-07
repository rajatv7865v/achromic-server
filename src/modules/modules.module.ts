import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { SpeakerModule } from './speaker/speaker.module';
import { PartnerModule } from './partner/partner.module';
import { CouponCodeModule } from './couponCode/couponCode.module';
import { TicketModule } from './ticket/ticket.module';
import { MembershipModule } from './membership/membership.module';
import { AuthModule } from 'src/authantication/auth.module';
import { CategoryModule } from './category/category.module';
import { MagazineModule } from './magzine/magzine.module';
import { AgendaModule } from './agenda/agenda.module';

@Module({
  imports: [
    AuthModule,
    EventModule,
    UserModule,
    SpeakerModule,
    PartnerModule,
    CouponCodeModule,
    TicketModule,
    MembershipModule,
    CategoryModule,
    MagazineModule,
    AgendaModule
  ],
})
export class ModulesModule {}
