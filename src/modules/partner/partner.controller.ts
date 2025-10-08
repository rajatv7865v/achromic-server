import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Put,
  Post,
  Query,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AddPartnerDto } from './dto/add-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { ParseObjectIdPipe } from 'src/core/pipe/parse-object-id.pipe';
import { Types } from 'mongoose';
import { CustomHttpException } from 'src/core/exceptions';
import { SearchDto } from 'src/common/dto/pagnation.dto';

@ApiTags('Partner')
@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @HttpCode(201)
  @Post()
  @ApiOperation({ summary: 'Create Partner' })
  @ApiBody({ type: AddPartnerDto })
  @ApiCreatedResponse({ description: 'Partner created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  addPartner(@Body() addPartnerDto: AddPartnerDto): Promise<any> {
    return this.partnerService.addPartner(addPartnerDto);
  }

  @HttpCode(200)
  @Get(':eventId')
  @ApiOperation({ summary: 'Get Partners' })
  @ApiOkResponse({ description: 'Partners retrieved successfully' })
  getPartner(
    @Query() searchDto: SearchDto,
    @Param('eventId') eventId: string,
  ): Promise<any> {
    return this.partnerService.getPartner(eventId,searchDto);
  }

  // @ApiOperation({ summary: 'Get Partner by ID' })
  // @ApiParam({ name: 'id', type: 'string', description: 'Partner ID' })
  // @ApiOkResponse({ description: 'Partner retrieved successfully' })
  // @ApiNotFoundResponse({ description: 'Partner not found' })
  // @HttpCode(200)
  // @Get(':id')
  // getPartnerById(
  //   @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  // ): Promise<any> {
  //   // Expecting partnerService.getPartnerById to exist in service
  //   // If not, implement accordingly
  //   // @ts-ignore
  //   return this.partnerService.getPartnerById(id);
  // }

  @ApiOperation({ summary: 'Update Partner' })
  @ApiParam({ name: 'id', type: 'string', description: 'Partner ID' })
  @ApiBody({ type: UpdatePartnerDto })
  @ApiOkResponse({ description: 'Partner updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Partner not found' })
  @HttpCode(200)
  @Put(':id')
  updatePartner(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ): Promise<any> {
    return this.partnerService.updatePartner(id, updatePartnerDto);
  }

  @ApiOperation({ summary: 'Update Partner Status' })
  @ApiParam({ name: 'id', type: 'string', description: 'Partner ID' })
  @ApiBody({
    schema: { properties: { isActive: { type: 'boolean', example: true } } },
  })
  @ApiOkResponse({ description: 'Partner status updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Partner not found' })
  @HttpCode(200)
  @Patch(':id/status')
  updatePartnerStatus(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body('isActive') isActive: boolean,
  ): Promise<any> {
    return this.partnerService.updatePartnerStatus(id, { isActive });
  }

  @ApiOperation({ summary: 'Delete Partner by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Partner ID' })
  @HttpCode(200)
  @Delete(':id')
  deletePartner(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    return this.partnerService.deletePartner(id);
  }
}
