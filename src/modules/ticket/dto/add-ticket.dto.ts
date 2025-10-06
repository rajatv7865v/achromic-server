import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddTicketDto {
  @ApiProperty()
  @IsString()
  ticketName: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  strikeAmount: number;

  @ApiProperty({ example: ['benefit1', 'benefit2'] })
  @IsString({ each: true })
  benefits: string[];

  @ApiProperty({ example: 'eventId' })
  @IsString()
  eventId: string;
}
