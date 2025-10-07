import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateAgendaStatusDto {
  @ApiProperty({ 
    description: 'Whether the agenda is active', 
    example: true 
  })
  @IsBoolean()
  isActive: boolean;
}
