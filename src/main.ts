import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { EnvService } from './infra/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(EnvService);
  const PORT = configService.get('PORT');
  const SERVICE = configService.get('SERVICE');
  const VERSION = configService.get('VERSION');

  app.listen(PORT, () => {
    console.log(`${SERVICE} - ${VERSION} - Listening on port ${PORT}`);
  });
}

bootstrap();
