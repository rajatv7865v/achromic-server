import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getHello(): string {
    return 'Upload API is running!';
  }

  handleFileUpload(file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      path: `${process.env.SERVER_URL}/${file.path}`,
    };
  }
}
