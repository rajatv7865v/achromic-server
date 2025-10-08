import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './providers/logger/logger.service';
import { swaggerConfig } from './swagger';
import { TransformResponseInterceptor } from './core/interceptors';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = app.get(LoggerService);
  try {
    const configService = app.get(ConfigService);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformResponseInterceptor());

    // Serve static files from uploads directory
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads',
      index: false, // Don't serve index.html for directory requests
      setHeaders: (res, path) => {
        // Set appropriate headers for different file types
        if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.gif')) {
          res.setHeader('Content-Type', 'image/jpeg');
          res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache for images
        } else if (path.endsWith('.pdf')) {
          res.setHeader('Content-Type', 'application/pdf');
        } else if (path.endsWith('.txt')) {
          res.setHeader('Content-Type', 'text/plain');
        }
      },
    });
    // Use cookie-parser middleware
    app.use(cookieParser());
    swaggerConfig(app);
    app.setGlobalPrefix('/api/v1');
    await app.listen(configService.get('APP.APP_PORT') || 3000);

    logger.log(
      `Application is running on: ${configService.get('APP.APP_URL')}/${configService.get('APP.APP_PORT')} `,
    );
  } catch (error) {
    console.error(error)
    logger.error('Error starting the application:', error);
  }
}
bootstrap();
