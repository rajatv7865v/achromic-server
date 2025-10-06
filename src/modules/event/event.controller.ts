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
import { EventService } from './event.service';
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
import { AddEventDto } from './dto/add-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateEventStatusDto } from './dto/update-status.dto';
import { SearchDto } from 'src/common/dto/pagnation.dto';
import { GetEventDTO } from './dto/get-event.dto';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new event',
    description:
      'Creates a new event with the provided details and category associations',
  })
  @ApiBody({ type: AddEventDto })
  @ApiCreatedResponse({
    description: 'Event created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Event created successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Tech Conference 2024' },
            description: {
              type: 'string',
              example: 'Annual technology conference',
            },
            venue: {
              type: 'string',
              example: 'Town Plaza',
            },
            location: {
              type: 'string',
              example: 'Dubai',
            },
            dateFrom: { type: 'string', example: '2024-06-15' },
            dateTo: { type: 'string', example: '2024-06-17' },
            bannerUrl: {
              type: 'string',
              example: 'https://example.com/banner.jpg',
            },
            timeFrom: { type: 'string', example: '09:00' },
            timeTo: { type: 'string', example: '18:00' },
            slug: { type: 'string', example: 'tech-conference-2024' },
            categories: {
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
  createEvent(@Body() addEventDto: AddEventDto) {
    return this.eventService.createEvent(addEventDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all events',
    description:
      'Retrieves all events with populated category details, sorted by creation date (newest first)',
  })
  @ApiOkResponse({
    description: 'Events retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Events retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              name: { type: 'string', example: 'Tech Conference 2024' },
              description: {
                type: 'string',
                example: 'Annual technology conference',
              },
              dateFrom: { type: 'string', example: '2024-06-15' },
              dateTo: { type: 'string', example: '2024-06-17' },
              bannerUrl: {
                type: 'string',
                example: 'https://example.com/banner.jpg',
              },
              timeFrom: { type: 'string', example: '09:00' },
              timeTo: { type: 'string', example: '18:00' },
              slug: { type: 'string', example: 'tech-conference-2024' },
              categories: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '507f1f77bcf86cd799439011',
                    },
                    name: { type: 'string', example: 'Technology' },
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
  getAllEvents(@Query() getEventDTO: GetEventDTO) {
    return this.eventService.getAllEvents(getEventDTO);
  }

  @Get('slug/:slug')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get event by slug',
    description:
      'Retrieves a specific event by its slug with populated category details',
  })
  @ApiParam({
    name: 'slug',
    description: 'Event slug',
    example: 'tech-conference-2024',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Event retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Event retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Tech Conference 2024' },
            description: {
              type: 'string',
              example: 'Annual technology conference',
            },
            dateFrom: { type: 'string', example: '2024-06-15' },
            dateTo: { type: 'string', example: '2024-06-17' },
            bannerUrl: {
              type: 'string',
              example: 'https://example.com/banner.jpg',
            },
            timeFrom: { type: 'string', example: '09:00' },
            timeTo: { type: 'string', example: '18:00' },
            slug: { type: 'string', example: 'tech-conference-2024' },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Technology' },
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
  @ApiNotFoundResponse({ description: 'Event not found' })
  getEventBySlug(@Param('slug') slug: string) {
    return this.eventService.getEventBySlug(slug);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get event by ID',
    description:
      'Retrieves a specific event by its ID with populated category details',
  })
  @ApiParam({
    name: 'id',
    description: 'Event ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Event retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Event retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Tech Conference 2024' },
            description: {
              type: 'string',
              example: 'Annual technology conference',
            },
            dateFrom: { type: 'string', example: '2024-06-15' },
            dateTo: { type: 'string', example: '2024-06-17' },
            bannerUrl: {
              type: 'string',
              example: 'https://example.com/banner.jpg',
            },
            timeFrom: { type: 'string', example: '09:00' },
            timeTo: { type: 'string', example: '18:00' },
            slug: { type: 'string', example: 'tech-conference-2024' },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Technology' },
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
  @ApiNotFoundResponse({ description: 'Event not found' })
  getEventById(@Param('id') eventId: string) {
    return this.eventService.getEventById(eventId);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update event',
    description:
      'Updates an event with new details and/or category associations',
  })
  @ApiParam({
    name: 'id',
    description: 'Event ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiBody({ type: UpdateEventDto })
  @ApiOkResponse({
    description: 'Event updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Event updated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Updated Tech Conference 2024' },
            description: {
              type: 'string',
              example: 'Updated annual technology conference',
            },
            dateFrom: { type: 'string', example: '2024-07-15' },
            dateTo: { type: 'string', example: '2024-07-17' },
            bannerUrl: {
              type: 'string',
              example: 'https://example.com/updated-banner.jpg',
            },
            timeFrom: { type: 'string', example: '10:00' },
            timeTo: { type: 'string', example: '19:00' },
            slug: { type: 'string', example: 'updated-tech-conference-2024' },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Technology' },
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
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  updateEvent(
    @Param('id') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.updateEvent(eventId, updateEventDto);
  }

  @Patch(':id/status')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update event status',
    description: 'Updates only the active status of an event',
  })
  @ApiParam({
    name: 'id',
    description: 'Event ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiBody({ type: UpdateEventStatusDto })
  @ApiOkResponse({
    description: 'Event status updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Event activated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Tech Conference 2024' },
            description: {
              type: 'string',
              example: 'Annual technology conference',
            },
            dateFrom: { type: 'string', example: '2024-06-15' },
            dateTo: { type: 'string', example: '2024-06-17' },
            bannerUrl: {
              type: 'string',
              example: 'https://example.com/banner.jpg',
            },
            timeFrom: { type: 'string', example: '09:00' },
            timeTo: { type: 'string', example: '18:00' },
            slug: { type: 'string', example: 'tech-conference-2024' },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Technology' },
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
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  updateEventStatus(
    @Param('id') eventId: string,
    @Body() updateStatusDto: UpdateEventStatusDto,
  ) {
    return this.eventService.updateEventStatus(eventId, updateStatusDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Delete event',
    description: 'Permanently deletes an event by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Event ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Event deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Event deleted successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Tech Conference 2024' },
            description: {
              type: 'string',
              example: 'Annual technology conference',
            },
            dateFrom: { type: 'string', example: '2024-06-15' },
            dateTo: { type: 'string', example: '2024-06-17' },
            bannerUrl: {
              type: 'string',
              example: 'https://example.com/banner.jpg',
            },
            timeFrom: { type: 'string', example: '09:00' },
            timeTo: { type: 'string', example: '18:00' },
            slug: { type: 'string', example: 'tech-conference-2024' },
            categories: {
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
  @ApiNotFoundResponse({ description: 'Event not found' })
  deleteEvent(@Param('id') eventId: string) {
    return this.eventService.deleteEvent(eventId);
  }
}
