import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdminSignupDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsString()
  @ApiProperty()

  email: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  password: string;
}
