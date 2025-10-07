import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TICKET_MODEL, TicketDocument } from './entity/ticket.entity';
import { Model, Types } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-status.dto';
import { CustomHttpException } from 'src/core/exceptions';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(TICKET_MODEL)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<any> {
    try {
      const ticket = await this.ticketModel.create({
        name: createTicketDto.name,
        description: createTicketDto.description,
        price: createTicketDto.price,
        strikePrice: createTicketDto.strikePrice,
        discount: createTicketDto.discount,
        discountName: createTicketDto.discountName,
        events: createTicketDto.events.map((id) => new Types.ObjectId(id)),
        isActive: createTicketDto.isActive ?? true,
      });

      return {
        message: 'Ticket created successfully',
        data: ticket,
      };
    } catch (error) {
      console.log(error)
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async getAllTickets(): Promise<any> {
    try {
      const tickets = await this.ticketModel
        .find()
        .populate('events')
        .sort({ createdAt: -1 })
        .exec();

      return {
        message: 'Tickets retrieved successfully',
        data: tickets,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async getTicketById(ticketId: string): Promise<any> {
    try {
      const ticket = await this.ticketModel
        .findById(new Types.ObjectId(ticketId))
        .populate('events')
        .exec();

      if (!ticket) {
        throw new CustomHttpException('Ticket not found', 404);
      }

      return {
        message: 'Ticket retrieved successfully',
        data: ticket,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async updateTicket(
    ticketId: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<any> {
    try {
      const updateData: any = { ...updateTicketDto };

      if (updateTicketDto.events) {
        updateData.events = updateTicketDto.events.map(
          (id) => new Types.ObjectId(id),
        );
      }

      const ticket = await this.ticketModel
        .findByIdAndUpdate(new Types.ObjectId(ticketId), updateData, {
          new: true,
          runValidators: true,
        })
        .populate('events')
        .exec();

      if (!ticket) {
        throw new CustomHttpException('Ticket not found', 404);
      }

      return {
        message: 'Ticket updated successfully',
        data: ticket,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async updateTicketStatus(
    ticketId: string,
    updateStatusDto: UpdateTicketStatusDto,
  ): Promise<any> {
    try {
      const ticket = await this.ticketModel
        .findByIdAndUpdate(
          new Types.ObjectId(ticketId),
          { isActive: updateStatusDto.isActive },
          { new: true, runValidators: true },
        )
        .populate('events')
        .exec();

      if (!ticket) {
        throw new CustomHttpException('Ticket not found', 404);
      }

      return {
        message: `Ticket ${updateStatusDto.isActive ? 'activated' : 'deactivated'} successfully`,
        data: ticket,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async deleteTicket(ticketId: string): Promise<any> {
    try {
      const ticket = await this.ticketModel
        .findByIdAndDelete(new Types.ObjectId(ticketId))
        .exec();

      if (!ticket) {
        throw new CustomHttpException('Ticket not found', 404);
      }

      return {
        message: 'Ticket deleted successfully',
        data: ticket,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async getTicketsByEvent(eventId: string): Promise<any> {
    try {
      const tickets = await this.ticketModel
        .find({ events: new Types.ObjectId(eventId) })
        .populate('events')
        .sort({ createdAt: -1 })
        .exec();

      return {
        message: 'Tickets retrieved successfully',
        data: tickets,
      };
    } catch (error) {
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }
}
