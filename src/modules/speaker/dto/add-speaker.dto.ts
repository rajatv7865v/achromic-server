import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddSpeakerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly designation: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly company: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly avatar: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly linkedin: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly eventId : string;
}
