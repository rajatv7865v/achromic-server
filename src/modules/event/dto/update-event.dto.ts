import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Updated Tech Conference 2024',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Description of the event',
    example:
      'Updated annual technology conference featuring the latest innovations',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Start date of the event',
    example: '2024-07-15',
    required: false,
  })
  @IsOptional()
  @IsString()
  dateFrom?: string;

  @ApiProperty({
    description: 'End date of the event',
    example: '2024-07-17',
    required: false,
  })
  @IsOptional()
  @IsString()
  dateTo?: string;

  @ApiProperty({
    description: 'Banner URL of the event',
    example: 'https://example.com/updated-banner.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  bannerUrl?: string;

  @ApiProperty({
    description: 'Start time of the event',
    example: '10:00',
    required: false,
  })
  @IsOptional()
  @IsString()
  timeFrom?: string;

  @ApiProperty({
    description: 'End time of the event',
    example: '19:00',
    required: false,
  })
  @IsOptional()
  @IsString()
  timeTo?: string;

  @ApiProperty({
    description: 'Unique slug for the event',
    example: 'updated-tech-conference-2024',
    required: false,
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    description: 'Array of category IDs for the event',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439013'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categories?: string[];

  @ApiProperty({
    description: 'Whether the event is active',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
