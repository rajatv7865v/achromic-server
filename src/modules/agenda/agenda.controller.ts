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
import { AgendaService } from './agenda.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { AddAgendaDto } from './dto/add-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { UpdateAgendaStatusDto } from './dto/update-status.dto';
import { GetAgendaDto } from './dto/get-agenda.dto';

@ApiTags('Agenda')
@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new agenda',
    description: 'Creates a new agenda with sessions and speakers for an event',
  })
  @ApiBody({ type: AddAgendaDto })
  @ApiCreatedResponse({
    description: 'Agenda created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Agenda created successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Tech Conference 2024 - Day 1' },
            description: { type: 'string', example: 'Full day agenda for the first day' },
            date: { type: 'string', example: '2024-06-15' },
            venue: { type: 'string', example: 'Convention Center' },
            location: { type: 'string', example: 'Dubai, UAE' },
            sessions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  title: { type: 'string', example: 'Welcome & Opening Keynote' },
                  time: { type: 'string', example: '09:00' },
                  duration: { type: 'string', example: '45 min' },
                  location: { type: 'string', example: 'Main Hall' },
                  type: { type: 'string', example: 'keynote' },
                  description: { type: 'string', example: 'Join us for an inspiring opening keynote' },
                  speakers: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        name: { type: 'string', example: 'Sarah Johnson' },
                        designation: { type: 'string', example: 'CEO' },
                        organization: { type: 'string', example: 'Tech Innovations Inc.' },
                        country: { type: 'string', example: 'USA' },
                        avatar: { type: 'string', example: '/api/placeholder/100/100' },
                        linkedinUrl: { type: 'string', example: 'https://linkedin.com/in/sarahjohnson' },
                        eventId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                      },
                    },
                  },
                },
              },
            },
            eventId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  createAgenda(@Body() addAgendaDto: AddAgendaDto) {
    return this.agendaService.createAgenda(addAgendaDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all agendas',
    description: 'Retrieves all agendas with pagination, filtering, and search capabilities',
  })
  @ApiOkResponse({
    description: 'Agendas retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              title: { type: 'string', example: 'Tech Conference 2024 - Day 1' },
              description: { type: 'string', example: 'Full day agenda for the first day' },
              date: { type: 'string', example: '2024-06-15' },
              venue: { type: 'string', example: 'Convention Center' },
              location: { type: 'string', example: 'Dubai, UAE' },
              sessions: { type: 'array', items: { type: 'object' } },
              eventId: { type: 'string', example: '507f1f77bcf86cd799439011' },
              isActive: { type: 'boolean', example: true },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            total: { type: 'number', example: 25 },
            totalPages: { type: 'number', example: 3 },
            hasNextPage: { type: 'boolean', example: true },
            hasPrevPage: { type: 'boolean', example: false },
          },
        },
      },
    },
  })
  getAllAgendas(@Query() getAgendaDto: GetAgendaDto) {
    return this.agendaService.getAllAgendas(getAgendaDto);
  }

  @Get('event/:eventId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get agendas by event ID',
    description: 'Retrieves all agendas for a specific event',
  })
  @ApiParam({
    name: 'eventId',
    description: 'Event ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Agendas retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Agendas retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              title: { type: 'string', example: 'Tech Conference 2024 - Day 1' },
              description: { type: 'string', example: 'Full day agenda for the first day' },
              date: { type: 'string', example: '2024-06-15' },
              venue: { type: 'string', example: 'Convention Center' },
              location: { type: 'string', example: 'Dubai, UAE' },
              sessions: { type: 'array', items: { type: 'object' } },
              eventId: { type: 'string', example: '507f1f77bcf86cd799439011' },
              isActive: { type: 'boolean', example: true },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
  })
  getAgendasByEventId(@Param('eventId') eventId: string) {
    return this.agendaService.getAgendasByEventId(eventId);
  }

  @Get('date-range')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get agendas by date range',
    description: 'Retrieves all active agendas within a specific date range',
  })
  @ApiQuery({
    name: 'startDate',
    description: 'Start date (YYYY-MM-DD)',
    example: '2024-06-01',
    type: 'string',
  })
  @ApiQuery({
    name: 'endDate',
    description: 'End date (YYYY-MM-DD)',
    example: '2024-06-30',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Agendas retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Agendas retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              title: { type: 'string', example: 'Tech Conference 2024 - Day 1' },
              description: { type: 'string', example: 'Full day agenda for the first day' },
              date: { type: 'string', example: '2024-06-15' },
              venue: { type: 'string', example: 'Convention Center' },
              location: { type: 'string', example: 'Dubai, UAE' },
              sessions: { type: 'array', items: { type: 'object' } },
              eventId: { type: 'string', example: '507f1f77bcf86cd799439011' },
              isActive: { type: 'boolean', example: true },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
  })
  getAgendasByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.agendaService.getAgendasByDateRange(startDate, endDate);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get agenda by ID',
    description: 'Retrieves a specific agenda by its ID with populated event details',
  })
  @ApiParam({
    name: 'id',
    description: 'Agenda ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Agenda retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Agenda retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Tech Conference 2024 - Day 1' },
            description: { type: 'string', example: 'Full day agenda for the first day' },
            date: { type: 'string', example: '2024-06-15' },
            venue: { type: 'string', example: 'Convention Center' },
            location: { type: 'string', example: 'Dubai, UAE' },
            sessions: { type: 'array', items: { type: 'object' } },
            eventId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Agenda not found' })
  getAgendaById(@Param('id') agendaId: string) {
    return this.agendaService.getAgendaById(agendaId);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update agenda',
    description: 'Updates an agenda with new details, sessions, and speakers',
  })
  @ApiParam({
    name: 'id',
    description: 'Agenda ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiBody({ type: UpdateAgendaDto })
  @ApiOkResponse({
    description: 'Agenda updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Agenda updated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Updated Tech Conference 2024 - Day 1' },
            description: { type: 'string', example: 'Updated full day agenda for the first day' },
            date: { type: 'string', example: '2024-06-15' },
            venue: { type: 'string', example: 'Updated Convention Center' },
            location: { type: 'string', example: 'Dubai, UAE' },
            sessions: { type: 'array', items: { type: 'object' } },
            eventId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Agenda not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  updateAgenda(
    @Param('id') agendaId: string,
    @Body() updateAgendaDto: UpdateAgendaDto,
  ) {
    return this.agendaService.updateAgenda(agendaId, updateAgendaDto);
  }

  @Patch(':id/status')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update agenda status',
    description: 'Updates only the active status of an agenda',
  })
  @ApiParam({
    name: 'id',
    description: 'Agenda ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiBody({ type: UpdateAgendaStatusDto })
  @ApiOkResponse({
    description: 'Agenda status updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Agenda activated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Tech Conference 2024 - Day 1' },
            description: { type: 'string', example: 'Full day agenda for the first day' },
            date: { type: 'string', example: '2024-06-15' },
            venue: { type: 'string', example: 'Convention Center' },
            location: { type: 'string', example: 'Dubai, UAE' },
            sessions: { type: 'array', items: { type: 'object' } },
            eventId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Agenda not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  updateAgendaStatus(
    @Param('id') agendaId: string,
    @Body() updateStatusDto: UpdateAgendaStatusDto,
  ) {
    return this.agendaService.updateAgendaStatus(agendaId, updateStatusDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Delete agenda',
    description: 'Permanently deletes an agenda by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Agenda ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Agenda deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Agenda deleted successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Tech Conference 2024 - Day 1' },
            description: { type: 'string', example: 'Full day agenda for the first day' },
            date: { type: 'string', example: '2024-06-15' },
            venue: { type: 'string', example: 'Convention Center' },
            location: { type: 'string', example: 'Dubai, UAE' },
            sessions: { type: 'array', items: { type: 'object' } },
            eventId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Agenda not found' })
  deleteAgenda(@Param('id') agendaId: string) {
    return this.agendaService.deleteAgenda(agendaId);
  }
}
