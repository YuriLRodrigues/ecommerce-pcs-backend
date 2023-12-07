import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { EnvService } from './infra/env/env.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const config = new DocumentBuilder()
    .setTitle('PCS Docs')
    .setDescription('The PCS Ecommerce API description')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/docs', app, document);

  const configService = app.get(EnvService);
  const PORT = configService.get('PORT');
  const SERVICE = configService.get('SERVICE');
  const VERSION = configService.get('VERSION');

  app.listen(PORT, () => {
    console.log(`${SERVICE} - ${VERSION} - Listening on port ${PORT}`);
  });
}

bootstrap();
