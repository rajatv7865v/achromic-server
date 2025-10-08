import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { PartnerType } from '../enum/partner.enum';

export class UpdatePartnerDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  companyName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  imagePath?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  companyUrl?: string;

  @IsEnum(PartnerType)
  @IsOptional()
  @ApiProperty({ required: false })
  partnerType?: PartnerType;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  eventId?: string;
}
