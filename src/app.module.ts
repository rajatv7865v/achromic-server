import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { Logger } from 'winston';
import { LoggerModule } from './providers/logger/logger.module';
import { ModulesModule } from './modules/modules.module';
import { DatabaseModule } from './database/mongoose/mongoose.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV == 'development'
          ? '.development.env'
          : '.production.env',
      cache: true,
      expandVariables: true,
      load: configuration,
    }),
    LoggerModule,
    DatabaseModule,
    ModulesModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
