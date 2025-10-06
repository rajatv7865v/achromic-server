import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { logger } from 'handlebars';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from 'src/providers/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - start;
        this.loggerService.debug(
          `${context.switchToHttp().getRequest().method} ${context.switchToHttp().getRequest().url} took ${elapsed}ms`,
        );
      }),
    );
  }
}
