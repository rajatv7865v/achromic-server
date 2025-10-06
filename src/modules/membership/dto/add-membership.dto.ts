import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddMembershipDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  readonly amount: number;


  @ApiProperty()
  @IsNumber()
  readonly strikeAmount: number;

  @ApiProperty({ example: '10', description: 'duration in Year' })
  @IsNumber()
  readonly duration: number;

  @ApiProperty()
  @IsString({ each: true })
  readonly benefits: string[];
}
