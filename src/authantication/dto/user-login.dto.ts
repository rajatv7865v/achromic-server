import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class UserLoginDTO {
  @ApiProperty()
  @IsEmail()
  readonly email?: string;

  @ApiProperty()
  @IsStrongPassword()
  readonly password?: string;
}
