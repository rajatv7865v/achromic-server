import { Injectable } from '@nestjs/common';
import { AddSpeakerDto } from './dto/add-speaker.dto';
import { CustomHttpException } from 'src/core/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { SPEAKER_MODEL, SpeakerDocument } from './entity/speaker.entity';
import { Model, Types } from 'mongoose';
import { add } from 'cheerio/lib/api/traversing';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectModel(SPEAKER_MODEL)
    private readonly speakerModel: Model<SpeakerDocument>,
  ) {}

  async addSpeaker(addSpeakerDto: AddSpeakerDto) {
    try {
      await this.speakerModel.create({
        name: addSpeakerDto.name,
        designation: addSpeakerDto.designation,
        country: addSpeakerDto.country,
        organization: addSpeakerDto.company,
        linkedinUrl: addSpeakerDto.linkedin,
        eventId: addSpeakerDto.eventId,
      });

      return {
        message: 'Speaker added successfully',
        data: addSpeakerDto,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
  async getSpeaker() {
    try {
      const speakers = await this.speakerModel.find();

      if (!speakers) {
        throw new CustomHttpException('Speakers not found', 404);
      }

      return {
        message: 'Speakers retrieved successfully',
        data: speakers,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
  async deleteSpeaker(id: string) {
    try {
      const speaker = await this.speakerModel.findByIdAndDelete(
        new Types.ObjectId(id),
      );

      if (!speaker) {
        throw new CustomHttpException('Speaker not found', 404);
      }

      return {
        message: 'Speaker deleted successfully',
        data: speaker,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
}
