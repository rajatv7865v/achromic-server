import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { SearchDto } from 'src/common/dto/pagnation.dto';

enum EventType {
  PAST = 'PAST',
  UPCOMING = 'UPCOMING',
}

export class GetEventDTO extends SearchDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Updated Tech Conference 2024',
    required: false,
  })
  @IsEnum(EventType)
  eventType?: EventType;
}
