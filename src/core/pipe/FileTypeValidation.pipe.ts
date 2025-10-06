// import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
// import * as path from 'path';

// @Injectable()
// export class FileTypeValidationPipe implements PipeTransform {
//   constructor(private readonly allowedTypes: string[]) {}

//   transform(file: Express.Multer.File) {
    
//     const ext = path.extname(file?.originalname).toUpperCase().substring(1);
//     if (!this.allowedTypes.includes(ext)) {
//       throw new BadRequestException(`File type ${ext} is not allowed`);
//     }
//     return file;
//   }
// }