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
import { MagazineService } from './magzine.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { UpdateMagazineStatusDto } from './dto/update-status.dto';
import { SearchDto } from 'src/common/dto/pagnation.dto';

@ApiTags('Magazine')
@Controller('magazine')
export class MagazineController {
  constructor(private readonly magazineService: MagazineService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new magazine',
    description:
      'Creates a new magazine with the provided details including title, month, year, description, cover image, download URL, preview URL, and categories',
  })
  @ApiBody({ type: CreateMagazineDto })
  @ApiCreatedResponse({
    description: 'Magazine created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Magazine created successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Digital Transformation in Finance' },
            month: { type: 'string', example: 'Jun' },
            year: { type: 'string', example: '2024' },
            description: {
              type: 'string',
              example: 'Exploring the latest trends in financial technology and digital banking solutions.',
            },
            coverImage: { type: 'string', example: '/api/placeholder/300/400' },
            downloadUrl: { type: 'string', example: '#' },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Finance' },
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
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  createMagazine(@Body() createMagazineDto: CreateMagazineDto) {
    return this.magazineService.createMagazine(createMagazineDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all magazines',
    description:
      'Retrieves all magazines sorted by creation date (newest first)',
  })

 
  getAllMagazines(@Query() SearchDto?: SearchDto) {

    return this.magazineService.getAllMagazines(SearchDto);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get magazine by ID',
    description:
      'Retrieves a specific magazine by its ID with all details',
  })
  @ApiParam({
    name: 'id',
    description: 'Magazine ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Magazine retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Magazine retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Digital Transformation in Finance' },
            month: { type: 'string', example: 'Jun' },
            year: { type: 'string', example: '2024' },
            description: {
              type: 'string',
              example: 'Exploring the latest trends in financial technology and digital banking solutions.',
            },
            coverImage: { type: 'string', example: '/api/placeholder/300/400' },
            downloadUrl: { type: 'string', example: '#' },
            previewUrl: { type: 'string', example: '#' },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Finance' },
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
  @ApiNotFoundResponse({ description: 'Magazine not found' })
  getMagazineById(@Param('id') id: string) {
    return this.magazineService.getMagazineById(id);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update magazine',
    description:
      'Updates a magazine with new details including title, month, year, description, cover image, download URL, preview URL, and categories',
  })
  @ApiParam({
    name: 'id',
    description: 'Magazine ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiBody({ type: UpdateMagazineDto })
  @ApiOkResponse({
    description: 'Magazine updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Magazine updated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: {
              type: 'string',
              example: 'Updated Digital Transformation in Finance',
            },
            month: { type: 'string', example: 'Jul' },
            year: { type: 'string', example: '2024' },
            description: {
              type: 'string',
              example: 'Updated exploration of the latest trends in financial technology and digital banking solutions.',
            },
            coverImage: {
              type: 'string',
              example: '/api/placeholder/300/400/updated',
            },
            downloadUrl: { type: 'string', example: '#updated' },
            previewUrl: { type: 'string', example: '#updated' },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Finance' },
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
  @ApiNotFoundResponse({ description: 'Magazine not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  updateMagazine(
    @Param('id') id: string,
    @Body() updateMagazineDto: UpdateMagazineDto,
  ) {
    return this.magazineService.updateMagazine(id, updateMagazineDto);
  }

  @Patch(':id/status')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update magazine status',
    description: 'Updates only the active status of a magazine',
  })
  @ApiParam({
    name: 'id',
    description: 'Magazine ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiBody({ type: UpdateMagazineStatusDto })
  @ApiOkResponse({
    description: 'Magazine status updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Magazine activated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Digital Transformation in Finance' },
            month: { type: 'string', example: 'Jun' },
            year: { type: 'string', example: '2024' },
            description: {
              type: 'string',
              example: 'Exploring the latest trends in financial technology and digital banking solutions.',
            },
            coverImage: { type: 'string', example: '/api/placeholder/300/400' },
            downloadUrl: { type: 'string', example: '#' },
            previewUrl: { type: 'string', example: '#' },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Finance' },
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
  @ApiNotFoundResponse({ description: 'Magazine not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  updateMagazineStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateMagazineStatusDto,
  ) {
    return this.magazineService.updateMagazineStatus(id, updateStatusDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Delete magazine',
    description: 'Permanently deletes a magazine by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Magazine ID',
    example: '507f1f77bcf86cd799439011',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Magazine deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Magazine deleted successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Digital Transformation in Finance' },
            month: { type: 'string', example: 'Jun' },
            year: { type: 'string', example: '2024' },
            description: {
              type: 'string',
              example: 'Exploring the latest trends in financial technology and digital banking solutions.',
            },
            coverImage: { type: 'string', example: '/api/placeholder/300/400' },
            downloadUrl: { type: 'string', example: '#' },
            previewUrl: { type: 'string', example: '#' },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  name: { type: 'string', example: 'Finance' },
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
  @ApiNotFoundResponse({ description: 'Magazine not found' })
  deleteMagazine(@Param('id') id: string) {
    return this.magazineService.deleteMagazine(id);
  }
}
