import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  IsMongoId,
  Min,
} from 'class-validator';

export class UpdateTicketDto {
  @ApiProperty({
    description: 'Name of the ticket',
    example: 'Updated VIP Pass',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Description of the ticket',
    example: 'Updated premium access to all events with exclusive benefits',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Current price of the ticket',
    example: 349.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({
    description: 'Original/strike price of the ticket',
    example: 449.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  strikePrice?: number;

  @ApiProperty({
    description: 'Discount amount',
    example: 75,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;

  @ApiProperty({
    description: 'Name of the discount',
    example: 'Summer Special',
    required: false,
  })
  @IsOptional()
  @IsString()
  discountName?: string;

  @ApiProperty({
    description: 'Array of event IDs for the ticket',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439013'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  events?: string[];

  @ApiProperty({
    description: 'Whether the ticket is active',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
