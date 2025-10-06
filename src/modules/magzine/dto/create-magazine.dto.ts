import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreateMagazineDto {
  @ApiProperty({
    description: 'Title of the magazine',
    example: 'Digital Transformation in Finance',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Publication month of the magazine',
    example: 'Jun',
  })
  @IsString()
  @IsNotEmpty()
  month: string;

  @ApiProperty({
    description: 'Publication year of the magazine',
    example: '2024',
  })
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty({
    description: 'Description of the magazine',
    example: 'Exploring the latest trends in financial technology and digital banking solutions.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Cover image URL of the magazine',
    example: '/api/placeholder/300/400',
  })
  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @ApiProperty({
    description: 'Download URL of the magazine',
    example: '#',
  })
  @IsString()
  @IsNotEmpty()
  downloadUrl: string;

  @ApiProperty({
    description: 'Preview URL of the magazine',
    example: '#',
  })
  @IsString()
  @IsNotEmpty()
  previewUrl: string;

  @ApiProperty({
    description: 'Array of category IDs for the magazine',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categories?: string[];

  @ApiProperty({
    description: 'Whether the magazine is active',
    example: true,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
