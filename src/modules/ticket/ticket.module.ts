import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TICKET_MODEL, TicketSchema } from './entity/ticket.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TICKET_MODEL, schema: TicketSchema }]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
