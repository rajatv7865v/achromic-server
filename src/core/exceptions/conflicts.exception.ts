import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionTitleList, StatusCodesList } from '../constants';

export class CustomConflictHttpException extends HttpException {
  constructor(message?: string, statusCode?: number, code?: number) {
    super(
      {
        message: message || ExceptionTitleList.BadRequest,
        code: code || StatusCodesList.BadRequest,
        statusCode: statusCode || HttpStatus.CONFLICT,
        error: true,
      },
      statusCode || HttpStatus.CONFLICT,
    );
  }
}