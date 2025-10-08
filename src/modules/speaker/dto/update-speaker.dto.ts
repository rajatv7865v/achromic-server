import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSpeakerDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly designation?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly company?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly country?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly avatar?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly linkedin?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly eventId?: string;
}
