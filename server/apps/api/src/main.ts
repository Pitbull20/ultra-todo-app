import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  // Security
  app.use(helmet());

  // CORS
  const origins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  app.enableCors({
    origin: origins.length ? origins : true,
    credentials: true,
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Versioning + prefix
  const prefix = process.env.API_PREFIX || '/api';
  const version = process.env.API_VERSION || 'v1';
  app.setGlobalPrefix(`${prefix}/${version}`);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Ultra Todo API')
    .setDescription('API for ultra-todo-app')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/docs`, app, doc);

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
}
bootstrap();
