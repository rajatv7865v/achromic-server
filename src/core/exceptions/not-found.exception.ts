import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

import { ExceptionTitleList, StatusCodesList } from '../constants';

export class CustomNotFoundException extends HttpException {
  constructor(message?: string, code?: number) {
    super(
      {
        message: message || ExceptionTitleList.NotFound,
        code: code || StatusCodesList.NotFound,
        statusCode: HttpStatus.NOT_FOUND,
        error: true,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
