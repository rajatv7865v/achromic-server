import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionTitleList, StatusCodesList } from '../constants';

export class UnauthorizedException extends HttpException {
  constructor(message?: string, code?: number) {
    super(
      {
        message: message || ExceptionTitleList.Unauthorized,
        code: code || StatusCodesList.UnauthorizedAccess,
        statusCode: HttpStatus.UNAUTHORIZED,
        error: true,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}