import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';
import { AGENDA_MODEL, AgendaSchema } from './entity/agenda.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AGENDA_MODEL, schema: AgendaSchema },
    ]),
  ],
  controllers: [AgendaController],
  providers: [AgendaService],
  exports: [AgendaService],
})
export class AgendaModule {}
