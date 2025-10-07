import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PartnerType } from '../enum/partner.enum';

export class AddPartnerDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  imagePath: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  companyUrl: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(PartnerType)
  partnerType: PartnerType = PartnerType.SPONSOR;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  eventId: string;
}
