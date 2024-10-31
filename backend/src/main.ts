import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Cambia esto por el origen que necesites permitir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas enviar cookies o credenciales
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use((err, req, res: Response, next: Function) => {
    logger.error(`${req.originalUrl} - ${req.method} - ${err.message}`, err.body);
    if (err) {
      req.isError = true;
      req.errorMessage = err.message;
      req.errorName = err.name;
      req.errorStatusCode = err.statusCode;
      req.errorBody = JSON.stringify(err.body);

      //JSON mal formado
      req.isErrorJSON = err.message.includes('JSON at') ? true : false;
      if (req.isErrorJSON) next();
      else res.status(err.status).json({ statusCode: err.statusCode, message: err.message, name: err.name });
    }
    else next();
  });
  await app.listen(3001);
}
bootstrap();
