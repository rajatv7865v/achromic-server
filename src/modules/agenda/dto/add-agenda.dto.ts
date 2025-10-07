import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsBoolean, IsEnum, IsMongoId } from 'class-validator';

export class SessionDto {
  @ApiProperty({ 
    description: 'Session ID', 
    example: 1 
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ 
    description: 'Session title', 
    example: 'Welcome & Opening Keynote' 
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    description: 'Session start time', 
    example: '09:00' 
  })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ 
    description: 'Session duration', 
    example: '45 min' 
  })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({ 
    description: 'Session location', 
    example: 'Main Hall' 
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ 
    description: 'Session type', 
    enum: ['keynote', 'panel', 'workshop', 'break', 'networking'],
    example: 'keynote' 
  })
  @IsEnum(['keynote', 'panel', 'workshop', 'break', 'networking'])
  type: string;

  @ApiProperty({ 
    description: 'Session description', 
    example: 'Join us for an inspiring opening keynote that sets the tone for the day ahead.' 
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    description: 'Array of speaker IDs for this session', 
    type: [String],
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012']
  })
  @IsArray()
  @IsMongoId({ each: true })
  speakers: string[];
}

export class AddAgendaDto {
  @ApiProperty({ 
    description: 'Agenda title', 
    example: 'Tech Conference 2024 - Day 1' 
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    description: 'Agenda description', 
    example: 'Full day agenda for the first day of Tech Conference 2024' 
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    description: 'Agenda date', 
    example: '2024-06-15' 
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ 
    description: 'Event venue', 
    example: 'Convention Center' 
  })
  @IsString()
  @IsNotEmpty()
  venue: string;

  @ApiProperty({ 
    description: 'Event location', 
    example: 'Dubai, UAE' 
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ 
    description: 'Agenda sessions', 
    type: [SessionDto] 
  })
  @IsArray()
  sessions: SessionDto[];

  @ApiProperty({ 
    description: 'Event ID this agenda belongs to', 
    example: '507f1f77bcf86cd799439011' 
  })
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({ 
    description: 'Whether the agenda is active', 
    example: true,
    required: false 
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
