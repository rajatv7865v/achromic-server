import { Injectable } from '@nestjs/common';
import { AddSpeakerDto } from './dto/add-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { CustomHttpException } from 'src/core/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { SPEAKER_MODEL, SpeakerDocument } from './entity/speaker.entity';
import { Model, Types } from 'mongoose';
import { add } from 'cheerio/lib/api/traversing';
import { SearchDto } from 'src/common/dto/pagnation.dto';

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
        avatar: addSpeakerDto.avatar,
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
  async getSpeaker(eventId: string, searchDto: SearchDto) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        search,
        searchFields,
      } = searchDto || ({} as SearchDto);

      const match: Record<string, any> = {};

      if (eventId) match.eventId = new Types.ObjectId(eventId);

      // Optional search filter
      if (search && searchFields) {
        const fields = searchFields.split(',').map((f) => f.trim());
        match.$and = match.$and || []; // ensure we can combine multiple conditions
        match.$and.push({
          $or: fields.map((field) => ({
            [field]: { $regex: search, $options: 'i' },
          })),
        });
      }

      const sort: Record<string, 1 | -1> = {
        [sortBy]: sortOrder === 'asc' ? 1 : -1,
      };
      const skip = (page - 1) * limit;

      const pipeline = [
        { $match: match },
        { $sort: sort },

        {
          $project: {
            _id: 1,
            name: 1,
            designation: 1,
            company: 1,
            country: 1,
            avatar: 1,
            organization: 1,
            linkedinUrl: 1,
            isActive: 1,
            createdAt: 1,
          },
        },
        {
          $facet: {
            data: [{ $skip: skip }, { $limit: Number(limit) }],
            totalCount: [{ $count: 'count' }],
          },
        },
      ];

      const result = await this.speakerModel.aggregate(pipeline);

      const data: SpeakerDocument[] = result[0]?.data || [];
      const total: number = result[0]?.totalCount?.[0]?.count || 0;
      const totalPages = Math.ceil(total / limit);

      return {
        data,
        meta: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    } catch (error: any) {
      console.log(error);
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }
  async updateSpeaker(id: string, updateSpeakerDto: UpdateSpeakerDto) {
    try {
      const updateData: any = {};
      
      if (updateSpeakerDto.name) updateData.name = updateSpeakerDto.name;
      if (updateSpeakerDto.designation) updateData.designation = updateSpeakerDto.designation;
      if (updateSpeakerDto.company) updateData.organization = updateSpeakerDto.company;
      if (updateSpeakerDto.country) updateData.country = updateSpeakerDto.country;
      if (updateSpeakerDto.avatar) updateData.avatar = updateSpeakerDto.avatar;
      if (updateSpeakerDto.linkedin) updateData.linkedinUrl = updateSpeakerDto.linkedin;
      if (updateSpeakerDto.eventId) updateData.eventId = new Types.ObjectId(updateSpeakerDto.eventId);

      const speaker = await this.speakerModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updateData,
        { new: true, runValidators: true }
      );

      if (!speaker) {
        throw new CustomHttpException('Speaker not found', 404);
      }

      return {
        message: 'Speaker updated successfully',
        data: speaker,
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
