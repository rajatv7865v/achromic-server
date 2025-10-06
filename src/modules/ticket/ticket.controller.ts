import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Patch,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-status.dto';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new ticket',
    description:
      'Creates a new ticket with the provided details and event associations',
  })
  @ApiBody({ type: CreateTicketDto })
  @ApiCreatedResponse({
    description: 'Ticket created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Ticket created successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'VIP Pass' },
            description: {
              type: 'string',
              example: 'Premium access to all events',
            },
            price: { type: 'number', example: 299.99 },
            strikePrice: { type: 'number', example: 399.99 },
            discount: { type: 'number', example: 50 },
            discountName: { type: 'string', example: 'Early Bird Special' },
            events: {
              type: 'array',
              items: { type: 'string', example: '507f1f77bcf86cd799439011' },
            },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.createTicket(createTicketDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all tickets',
    description:
      'Retrieves all tickets with populated event details, sorted by creation date (newest first)',
  })
  @ApiQuery({
    name: 'event',
    required: false,
    description: 'Filter tickets by event ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiOkResponse({
    description: 'Tickets retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Tickets retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              name: { type: 'string', example: 'VIP Pass' },
              description: {
                type: 'string',
                example: 'Premium access to all events',
              },
              price: { type: 'number', example: 299.99 },
              strikePrice: { type: 'number', example: 399.99 },
              discount: { type: 'number', example: 50 },
              discountName: { type: 'string', example: 'Early Bird Special' },
              events: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '507f1f77bcf86cd799439011',
                    },
                    name: { type: 'string', example: 'Tech Conference 2024' },
                    slug: { type: 'string', example: 'tech-conference-2024' },
                    isActive: { type: 'boolean', example: true },
                  },
                },
              },
              isActive: { type: 'boolean', example: true },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
  })
  getAllTickets(@Query('event') eventId?: string) {
    if (eventId) {
      return this.ticketService.getTicketsByEvent(eventId);
    }
    return this.ticketService.getAllTickets();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get ticket by ID',
    description:
      'Retrieves a specific ticket by its ID with populated event details',
  })
  @ApiParam({
    name: 'id',
    description: 'Ticket ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Ticket retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Ticket retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'VIP Pass' },
            description: {
              type: 'string',
              example: 'Premium access to all events',
            },
            price: { type: 'number', example: 299.99 },
            strikePrice: { type: 'number', example: 399.99 },
            discount: { type: 'number', example: 50 },
            discountName: { type: 'string', example: 'Early Bird Special' },
            events: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Tech Conference 2024' },
                  slug: { type: 'string', example: 'tech-conference-2024' },
                  isActive: { type: 'boolean', example: true },
                },
              },
            },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Ticket not found' })
  getTicketById(@Param('id') ticketId: string) {
    return this.ticketService.getTicketById(ticketId);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update ticket',
    description: 'Updates a ticket with new details and/or event associations',
  })
  @ApiParam({
    name: 'id',
    description: 'Ticket ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiBody({ type: UpdateTicketDto })
  @ApiOkResponse({
    description: 'Ticket updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Ticket updated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Updated VIP Pass' },
            description: {
              type: 'string',
              example: 'Updated premium access to all events',
            },
            price: { type: 'number', example: 349.99 },
            strikePrice: { type: 'number', example: 449.99 },
            discount: { type: 'number', example: 75 },
            discountName: { type: 'string', example: 'Summer Special' },
            events: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Tech Conference 2024' },
                  slug: { type: 'string', example: 'tech-conference-2024' },
                  isActive: { type: 'boolean', example: true },
                },
              },
            },
            isActive: { type: 'boolean', example: false },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Ticket not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  updateTicket(
    @Param('id') ticketId: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.updateTicket(ticketId, updateTicketDto);
  }

  @Patch(':id/status')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update ticket status',
    description: 'Updates only the active status of a ticket',
  })
  @ApiParam({
    name: 'id',
    description: 'Ticket ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiBody({ type: UpdateTicketStatusDto })
  @ApiOkResponse({
    description: 'Ticket status updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Ticket activated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'VIP Pass' },
            description: {
              type: 'string',
              example: 'Premium access to all events',
            },
            price: { type: 'number', example: 299.99 },
            strikePrice: { type: 'number', example: 399.99 },
            discount: { type: 'number', example: 50 },
            discountName: { type: 'string', example: 'Early Bird Special' },
            events: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Tech Conference 2024' },
                  slug: { type: 'string', example: 'tech-conference-2024' },
                  isActive: { type: 'boolean', example: true },
                },
              },
            },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Ticket not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  updateTicketStatus(
    @Param('id') ticketId: string,
    @Body() updateStatusDto: UpdateTicketStatusDto,
  ) {
    return this.ticketService.updateTicketStatus(ticketId, updateStatusDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Delete ticket',
    description: 'Permanently deletes a ticket by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Ticket ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Ticket deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Ticket deleted successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'VIP Pass' },
            description: {
              type: 'string',
              example: 'Premium access to all events',
            },
            price: { type: 'number', example: 299.99 },
            strikePrice: { type: 'number', example: 399.99 },
            discount: { type: 'number', example: 50 },
            discountName: { type: 'string', example: 'Early Bird Special' },
            events: {
              type: 'array',
              items: { type: 'string', example: '507f1f77bcf86cd799439011' },
            },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Ticket not found' })
  deleteTicket(@Param('id') ticketId: string) {
    return this.ticketService.deleteTicket(ticketId);
  }
}
