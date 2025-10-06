import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  IsMongoId,
  Min,
} from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Name of the ticket',
    example: 'VIP Pass',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the ticket',
    example: 'Premium access to all events with exclusive benefits',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Current price of the ticket',
    example: 299.99,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Original/strike price of the ticket',
    example: 399.99,
  })
  @IsNumber()
  @Min(0)
  strikePrice: number;

  @ApiProperty({
    description: 'Discount amount',
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;

  @ApiProperty({
    description: 'Name of the discount',
    example: 'Early Bird Special',
    required: false,
  })
  @IsOptional()
  @IsString()
  discountName?: string;

  @ApiProperty({
    description: 'Array of event IDs for the ticket',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  events: string[];

  @ApiProperty({
    description: 'Whether the ticket is active',
    example: true,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
