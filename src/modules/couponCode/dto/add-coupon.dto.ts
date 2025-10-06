import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCouponCodeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  couponName: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  expirationDate: string;

  @ApiProperty({ example: '68ac0d0c74fbddd4b264c230' })
  @IsString()
  @IsNotEmpty()
  eventId: string;
}
