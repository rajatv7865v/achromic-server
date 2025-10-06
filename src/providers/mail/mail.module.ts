import { Module } from '@nestjs/common';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        ({
          transport: {
            host: configService.get('MAIL.HOST'),
            port: 587, // SMTP port
            secure: false, // Use TLS or not
            auth: {
              user: configService.get('MAIL.USER'),
              pass: configService.get('MAIL.PASS'),
            },
          },
          defaults: {
            from: '"nest-modules" <info@globalipacademy.in>',
          },
          template: {
            dir: process.cwd() + '/src/utils/templates/',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: false,
            },
          },
        }) as MailerOptions,
    }),
  ],
  providers: [MailService, LoggerService],
  exports: [MailService],
})
export class MailModule {}
