import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EVENT_MODEL, EventDocument } from './entity/event.entity';
import { Model, Types } from 'mongoose';
import { CustomHttpException } from 'src/core/exceptions';
import { AddEventDto } from './dto/add-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateEventStatusDto } from './dto/update-status.dto';
import { SearchDto } from 'src/common/dto/pagnation.dto';
import { GetEventDTO } from './dto/get-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(EVENT_MODEL) private eventModel: Model<EventDocument>,
  ) {}

  async createEvent(addEventDto: AddEventDto): Promise<any> {
    try {
      // Use provided slug or generate from event name
      const baseSlug = addEventDto.slug || this.generateSlug(addEventDto.name);
      let slug = baseSlug;
      let counter = 1;

      // Ensure slug is unique
      while (await this.eventModel.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      const event = await this.eventModel.create({
        name: addEventDto.name,
        description: addEventDto.description,
        dateFrom: addEventDto.dateFrom,
        dateTo: addEventDto.dateTo,
        bannerUrl: addEventDto.bannerUrl,
        timeFrom: addEventDto.timeFrom,
        timeTo: addEventDto.timeTo,
        venue: addEventDto.venue,
        location: addEventDto.location,
        slug: slug,
        categories: addEventDto.categories.map((id) => new Types.ObjectId(id)),
        isActive: addEventDto.isActive ?? true,
      });

      return {
        message: 'Event created successfully',
        data: event,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async getAllEvents(getEventDTO: GetEventDTO): Promise<any> {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        search,
        searchFields,
        eventType,
      } = getEventDTO || ({} as GetEventDTO);

      console.log('getEventDTO', eventType);

      const today = new Date();
      const match: Record<string, any> = {};

      const addFieldsStage = {
        $addFields: {
          dateFromDate: { $toDate: '$dateFrom' }, // assumes dateFrom is like "2025-12-06"
        },
      };

      // Filter based on event type
      if (eventType === 'PAST') {
        match.dateFromDate = { $lt: today };
      } else if (eventType === 'UPCOMING') {
        match.dateFromDate = { $gte: today };
      }
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
        addFieldsStage,
        { $match: match },
        { $sort: sort },
        {
          $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categories',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
            dateFrom: 1,
            dateTo: 1,
            bannerUrl: 1,
            timeFrom: 1,
            timeTo: 1,
            slug: 1,
            venue: 1,
            location: 1,
            isActive: 1,
            createdAt: 1,
            categories: {
              $map: {
                input: '$categories',
                as: 'cat',
                in: '$$cat.name',
              },
            },
          },
        },
        {
          $facet: {
            data: [{ $skip: skip }, { $limit: Number(limit) }],
            totalCount: [{ $count: 'count' }],
          },
        },
      ];

      const result = await this.eventModel.aggregate(pipeline);

      const data: EventDocument[] = result[0]?.data || [];
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

  async getEventBySlug(slug: string): Promise<any> {
    try {
      const event = await this.eventModel
        .findOne({ slug })
        .populate('categories')
        .exec();

      if (!event) {
        throw new CustomHttpException('Event not found', 404);
      }

      return {
        message: 'Event retrieved successfully',
        data: event,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async getEventById(eventId: string): Promise<any> {
    try {
      const event = await this.eventModel
        .findById(new Types.ObjectId(eventId))
        .populate('categories')
        .exec();

      if (!event) {
        throw new CustomHttpException('Event not found', 404);
      }

      return {
        message: 'Event retrieved successfully',
        data: event,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async updateEvent(
    eventId: string,
    updateEventDto: UpdateEventDto,
  ): Promise<any> {
    try {
      const updateData: any = { ...updateEventDto };

      // If name is being updated and no slug provided, generate new slug
      if (updateEventDto.name && !updateEventDto.slug) {
        const baseSlug = this.generateSlug(updateEventDto.name);
        let slug = baseSlug;
        let counter = 1;

        // Ensure slug is unique (excluding current event)
        while (
          await this.eventModel.findOne({
            slug,
            _id: { $ne: new Types.ObjectId(eventId) },
          })
        ) {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
        updateData.slug = slug;
      }

      if (updateEventDto.categories) {
        updateData.categories = updateEventDto.categories.map(
          (id) => new Types.ObjectId(id),
        );
      }

      const event = await this.eventModel
        .findByIdAndUpdate(new Types.ObjectId(eventId), updateData, {
          new: true,
          runValidators: true,
        })
        .populate('categories')
        .exec();

      if (!event) {
        throw new CustomHttpException('Event not found', 404);
      }

      return {
        message: 'Event updated successfully',
        data: event,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async updateEventStatus(
    eventId: string,
    updateStatusDto: UpdateEventStatusDto,
  ): Promise<any> {
    try {
      const event = await this.eventModel
        .findByIdAndUpdate(
          new Types.ObjectId(eventId),
          { isActive: updateStatusDto.isActive },
          { new: true, runValidators: true },
        )
        .populate('categories')
        .exec();

      if (!event) {
        throw new CustomHttpException('Event not found', 404);
      }

      return {
        message: `Event ${updateStatusDto.isActive ? 'activated' : 'deactivated'} successfully`,
        data: event,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async deleteEvent(eventId: string): Promise<any> {
    try {
      const event = await this.eventModel
        .findByIdAndDelete(new Types.ObjectId(eventId))
        .exec();
      if (!event) {
        throw new CustomHttpException('Event not found', 404);
      }
      return {
        message: 'Event deleted successfully',
        data: event,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async getEventsByCategory(categoryId: string): Promise<any> {
    try {
      const events = await this.eventModel
        .find({ categories: new Types.ObjectId(categoryId) })
        .populate('categories')
        .sort({ createdAt: -1 })
        .exec();

      return {
        message: 'Events retrieved successfully',
        data: events,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
  }
}
