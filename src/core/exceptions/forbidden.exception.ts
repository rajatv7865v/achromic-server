import { ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionTitleList, StatusCodesList } from '../constants';

export class CustomForbiddenException extends HttpException {
  constructor(message?: string, code?: number) {
    super(
      {
        message: message || ExceptionTitleList.Forbidden,
        code: code || StatusCodesList.Forbidden,
        statusCode: HttpStatus.FORBIDDEN,
        error: true,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
