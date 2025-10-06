import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsMongoId,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class AddEventDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Tech Conference 2024',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the event',
    example: 'Annual technology conference featuring the latest innovations',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty({
    description: 'Venue of the event',
    example: 'Annual technology conference featuring the latest innovations',
  })
  @IsNotEmpty()
  @IsString()
  venue: string;
  @ApiProperty({
    description: 'Location of the event',
    example: 'Annual technology conference featuring the latest innovations',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Start date of the event',
    example: '2024-06-15',
  })
  @IsNotEmpty()
  @IsString()
  dateFrom: string;

  @ApiProperty({
    description: 'End date of the event',
    example: '2024-06-17',
  })
  @IsNotEmpty()
  @IsString()
  dateTo: string;

  @ApiProperty({
    description: 'Banner URL of the event',
    example: 'https://example.com/banner.jpg',
  })
  @IsNotEmpty()
  @IsString()
  bannerUrl: string;

  @ApiProperty({
    description: 'Start time of the event',
    example: '09:00',
  })
  @IsNotEmpty()
  @IsString()
  timeFrom: string;

  @ApiProperty({
    description: 'End time of the event',
    example: '18:00',
  })
  @IsNotEmpty()
  @IsString()
  timeTo: string;

  @ApiProperty({
    description: 'Unique slug for the event (auto-generated if not provided)',
    example: 'tech-conference-2024',
    required: false,
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    description: 'Array of category IDs for the event',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  categories: string[];

  @ApiProperty({
    description: 'Whether the event is active',
    example: true,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
