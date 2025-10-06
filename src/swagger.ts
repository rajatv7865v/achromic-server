import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: any) => {
  const config = new DocumentBuilder()
    .setTitle('Global Legal Association API')
    .setDescription('The Global Legal Association API description')
    .setVersion('1.0')
    .addTag('events')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  
SwaggerModule.setup('api-docs', app, documentFactory, {
  jsonDocumentUrl: 'swagger/json',
});

};
