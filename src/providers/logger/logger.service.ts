import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { format } from 'util';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;
  private readonly isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.IS_PROD === 'false';
    this.logger = winston.createLogger({
      level: this.isDevelopment ? 'debug' : 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
          const fileInfo = info.file ? ` (${info.file})` : '';
          return `[${info.timestamp}] ${info.level}: ${info.message}${fileInfo}`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new DailyRotateFile({
          level: 'error',
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '4d',
        }),
      ],
    });
  }

  private getCallerInfo(): string {
    const stack = new Error().stack;
    if (!stack) return 'unknown file';

    const stackLines = stack.split('\n');
    // The third line usually contains the caller file and line number
    const callerLine = stackLines[3];
    const callerMatch = callerLine.match(/\((.*?):(\d+):(\d+)\)/);
    if (callerMatch) {
      const [_, file, line, column] = callerMatch;
      return `${file}:${line}:${column}`;
    }
    return 'unknown file';
  }

  log(message: string) {
    const callerInfo = this.getCallerInfo();
    this.logger.info(message, { file: callerInfo });
  }

  error(message: string, trace: string) {
    const callerInfo = this.getCallerInfo();
    this.logger.error(message, { trace, file: callerInfo });
  }

  warn(message: string) {
    const callerInfo = this.getCallerInfo();
    this.logger.warn(message, { file: callerInfo });
  }

  debug(message: string) {
    const callerInfo = this.getCallerInfo();
    this.logger.debug(message, { file: callerInfo });
  }

  verbose(message: string) {
    const callerInfo = this.getCallerInfo();
    this.logger.verbose(message, { file: callerInfo });
  }
}
