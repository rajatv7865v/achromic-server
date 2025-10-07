import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AGENDA_MODEL, AgendaDocument } from './entity/agenda.entity';
import { Model, Types } from 'mongoose';
import { CustomHttpException } from 'src/core/exceptions';
import { AddAgendaDto } from './dto/add-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { UpdateAgendaStatusDto } from './dto/update-status.dto';
import { GetAgendaDto } from './dto/get-agenda.dto';

@Injectable()
export class AgendaService {
  constructor(
    @InjectModel(AGENDA_MODEL) private agendaModel: Model<AgendaDocument>,
  ) {}

  async createAgenda(addAgendaDto: AddAgendaDto): Promise<any> {
    try {
      // Convert speaker IDs to ObjectIds in sessions
      const sessionsWithObjectIds = addAgendaDto.sessions.map((session) => ({
        ...session,
        speakers: session.speakers.map(
          (speakerId) => new Types.ObjectId(speakerId),
        ),
      }));

      const agenda = await this.agendaModel.create({
        title: addAgendaDto.title,
        description: addAgendaDto.description,
        date: addAgendaDto.date,
        venue: addAgendaDto.venue,
        location: addAgendaDto.location,
        sessions: sessionsWithObjectIds,
        eventId: new Types.ObjectId(addAgendaDto.eventId),
        isActive: addAgendaDto.isActive ?? true,
      });

      // Populate the created agenda with speaker details
      const populatedAgenda = await this.agendaModel
        .findById(agenda._id)
        .populate({
          path: 'sessions.speakers',
          model: 'Speaker',
        })
        .populate('eventId')
        .exec();

      return {
        message: 'Agenda created successfully',
        data: populatedAgenda,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async getAllAgendas(getAgendaDto: GetAgendaDto): Promise<any> {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        search,
        searchFields,
        eventId,
        date,
        isActive,
      } = getAgendaDto || ({} as GetAgendaDto);

      console.log(getAgendaDto);

      const match: Record<string, any> = {};

      // Filter by eventId
      if (eventId) {
        match.eventId = new Types.ObjectId(eventId);
      }

      console.log(match);
      // Filter by date
      if (date) {
        match.date = date;
      }

      // Filter by active status
      if (isActive !== undefined) {
        match.isActive = Boolean(isActive);
      }

      console.log(match);
      // Optional search filter
      if (search && searchFields) {
        const fields = searchFields.split(',').map((f) => f.trim());
        match.$and = match.$and || [];
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
          $lookup: {
            from: 'events',
            localField: 'eventId',
            foreignField: '_id',
            as: 'event',
          },
        },
        {
          $lookup: {
            from: 'speakers',
            localField: 'sessions.speakers',
            foreignField: '_id',
            as: 'allSpeakers',
          },
        },
        {
          $addFields: {
            sessions: {
              $map: {
                input: '$sessions',
                as: 'session',
                in: {
                  $mergeObjects: [
                    '$$session',
                    {
                      speakers: {
                        $map: {
                          input: '$$session.speakers',
                          as: 'speakerId',
                          in: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: '$allSpeakers',
                                  cond: { $eq: ['$$this._id', '$$speakerId'] },
                                },
                              },
                              0,
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            date: 1,
            venue: 1,
            location: 1,
            sessions: 1,
            eventId: 1,
            isActive: 1,
            createdAt: 1,
            updatedAt: 1,
            event: {
              $arrayElemAt: ['$event', 0],
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

      const result = await this.agendaModel.aggregate(pipeline);

      const data: AgendaDocument[] = result[0]?.data || [];
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

  async getAgendaById(agendaId: string): Promise<any> {
    try {
      const agenda = await this.agendaModel
        .findById(new Types.ObjectId(agendaId))
        .populate({
          path: 'sessions.speakers',
          model: 'Speaker',
        })
        .populate('eventId')
        .exec();

      if (!agenda) {
        throw new CustomHttpException('Agenda not found', 404);
      }

      return {
        message: 'Agenda retrieved successfully',
        data: agenda,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async getAgendasByEventId(eventId: string): Promise<any> {
    try {
      const agendas = await this.agendaModel
        .find({ eventId: new Types.ObjectId(eventId) })
        .populate({
          path: 'sessions.speakers',
          model: 'Speaker',
        })
        .populate('eventId')
        .sort({ date: 1, createdAt: 1 })
        .exec();

      return {
        message: 'Agendas retrieved successfully',
        data: agendas,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async updateAgenda(
    agendaId: string,
    updateAgendaDto: UpdateAgendaDto,
  ): Promise<any> {
    try {
      const updateData: any = { ...updateAgendaDto };

      if (updateAgendaDto.eventId) {
        updateData.eventId = new Types.ObjectId(updateAgendaDto.eventId);
      }

      // Convert speaker IDs to ObjectIds in sessions if sessions are being updated
      if (updateAgendaDto.sessions) {
        updateData.sessions = updateAgendaDto.sessions.map((session) => ({
          ...session,
          speakers: session.speakers.map(
            (speakerId) => new Types.ObjectId(speakerId),
          ),
        }));
      }

      const agenda = await this.agendaModel
        .findByIdAndUpdate(new Types.ObjectId(agendaId), updateData, {
          new: true,
          runValidators: true,
        })
        .populate({
          path: 'sessions.speakers',
          model: 'Speaker',
        })
        .populate('eventId')
        .exec();

      if (!agenda) {
        throw new CustomHttpException('Agenda not found', 404);
      }

      return {
        message: 'Agenda updated successfully',
        data: agenda,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async updateAgendaStatus(
    agendaId: string,
    updateStatusDto: UpdateAgendaStatusDto,
  ): Promise<any> {
    try {
      const agenda = await this.agendaModel
        .findByIdAndUpdate(
          new Types.ObjectId(agendaId),
          { isActive: updateStatusDto.isActive },
          { new: true, runValidators: true },
        )
        .populate({
          path: 'sessions.speakers',
          model: 'Speaker',
        })
        .populate('eventId')
        .exec();

      if (!agenda) {
        throw new CustomHttpException('Agenda not found', 404);
      }

      return {
        message: `Agenda ${updateStatusDto.isActive ? 'activated' : 'deactivated'} successfully`,
        data: agenda,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async deleteAgenda(agendaId: string): Promise<any> {
    try {
      const agenda = await this.agendaModel
        .findByIdAndDelete(new Types.ObjectId(agendaId))
        .exec();

      if (!agenda) {
        throw new CustomHttpException('Agenda not found', 404);
      }

      return {
        message: 'Agenda deleted successfully',
        data: agenda,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async getAgendasByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<any> {
    try {
      const agendas = await this.agendaModel
        .find({
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          isActive: true,
        })
        .populate({
          path: 'sessions.speakers',
          model: 'Speaker',
        })
        .populate('eventId')
        .sort({ date: 1, createdAt: 1 })
        .exec();

      return {
        message: 'Agendas retrieved successfully',
        data: agendas,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }
}
