import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { ApiTags } from '@nestjs/swagger';
import { AddSpeakerDto } from './dto/add-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { SearchDto } from 'src/common/dto/pagnation.dto';
import { CustomHttpException } from 'src/core/exceptions';

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
  @Get(':eventId')
  getSpeaker(@Query() searchDto: SearchDto, @Param('eventId') eventId: string) {
    try {
      return this.speakerService.getSpeaker(eventId,searchDto);
    } catch (error) {
      throw new CustomHttpException(error.status, error.message);
    }
  }

  @HttpCode(200)
  @Put(':id')
  updateSpeaker(@Param('id') id: string, @Body() updateSpeakerDto: UpdateSpeakerDto) {
    try {
      return this.speakerService.updateSpeaker(id, updateSpeakerDto);
    } catch (error) {
      throw new CustomHttpException(error.status, error.message);
    }
  }

  @HttpCode(200)
  @Delete(':id')
  deleteSpeaker(@Param('id') id: string) {
    return this.speakerService.deleteSpeaker(id);
  }
}
