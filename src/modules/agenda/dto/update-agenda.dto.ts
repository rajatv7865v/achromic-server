import { PartialType } from '@nestjs/swagger';
import { AddAgendaDto } from './add-agenda.dto';

export class UpdateAgendaDto extends PartialType(AddAgendaDto) {}
