import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { ApiTags } from '@nestjs/swagger';
import { AddSpeakerDto } from './dto/add-speaker.dto';

@ApiTags('Speaker')
@Controller('speaker')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @HttpCode(201)
  @Post()
  addSpeaker(@Body() addSpeakerDto: AddSpeakerDto) {
    return this.speakerService.addSpeaker(addSpeakerDto);
  }

  @HttpCode(200)
  @Get()
  getSpeaker() {
    return this.speakerService.getSpeaker();
  }

  @HttpCode(200)
  @Delete(':id')
  deleteSpeaker(@Param('id') id: string) {
    return this.speakerService.deleteSpeaker(id);
  }
}
