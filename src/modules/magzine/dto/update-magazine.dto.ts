import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class UpdateMagazineDto {
  @ApiProperty({
    description: 'Title of the magazine',
    example: 'Updated Digital Transformation in Finance',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Publication month of the magazine',
    example: 'Jul',
    required: false,
  })
  @IsOptional()
  @IsString()
  month?: string;

  @ApiProperty({
    description: 'Publication year of the magazine',
    example: '2024',
    required: false,
  })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty({
    description: 'Description of the magazine',
    example: 'Updated exploration of the latest trends in financial technology and digital banking solutions.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Cover image URL of the magazine',
    example: '/api/placeholder/300/400/updated',
    required: false,
  })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiProperty({
    description: 'Download URL of the magazine',
    example: '#updated',
    required: false,
  })
  @IsOptional()
  @IsString()
  downloadUrl?: string;

  @ApiProperty({
    description: 'Preview URL of the magazine',
    example: '#updated',
    required: false,
  })
  @IsOptional()
  @IsString()
  previewUrl?: string;

  @ApiProperty({
    description: 'Array of category IDs for the magazine',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439013'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categories?: string[];

  @ApiProperty({
    description: 'Whether the magazine is active',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
