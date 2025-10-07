import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAgendaDto {
  @ApiProperty({ 
    description: 'Page number for pagination', 
    example: 1,
    required: false,
    minimum: 1 
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ 
    description: 'Number of items per page', 
    example: 10,
    required: false,
    minimum: 1 
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({ 
    description: 'Field to sort by', 
    example: 'createdAt',
    required: false 
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiProperty({ 
    description: 'Sort order', 
    enum: ['asc', 'desc'],
    example: 'desc',
    required: false 
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  @ApiProperty({ 
    description: 'Search term', 
    example: 'keynote',
    required: false 
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ 
    description: 'Fields to search in (comma-separated)', 
    example: 'title,description',
    required: false 
  })
  @IsOptional()
  @IsString()
  searchFields?: string;

  @ApiProperty({ 
    description: 'Filter by event ID', 
    example: '507f1f77bcf86cd799439011',
    required: false 
  })
  @IsOptional()
  @IsString()
  eventId?: string;

  @ApiProperty({ 
    description: 'Filter by date', 
    example: '2024-06-15',
    required: false 
  })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiProperty({ 
    description: 'Filter by active status', 
    example: true,
    required: false 
  })
  @IsOptional()
  isActive?: boolean;
}
