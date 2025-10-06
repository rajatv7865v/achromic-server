import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
