import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { ApiTags } from '@nestjs/swagger';
import { AddMembershipDto } from './dto/add-membership.dto';

@ApiTags('Membership')
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @HttpCode(201)
  @Post()
  addMembership(@Body() addMembershipDto: AddMembershipDto) {
    return this.membershipService.addMembership(addMembershipDto);
  }

  @HttpCode(200)
  @Get()
  getMembership() {
    return this.membershipService.getMembership();
  }

  @HttpCode(200)
  @Delete(':id')
  deleteMembership(@Param('id') id: string) {
    return this.membershipService.deleteMembership(id);
  }
}
