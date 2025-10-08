import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import {
  ApiExcludeController,
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';
import { existsSync } from 'fs';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a file' })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Folder to store files
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.handleFileUpload(file);
  }

  @ApiOperation({ summary: 'Get uploaded file' })
  @ApiParam({ name: 'filename', type: 'string', description: 'File name' })
  @Get('file/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', filename);
    
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    
    return res.sendFile(filePath);
  }
}
