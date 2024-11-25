import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar la validación global
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Para que convierta el tipo de los datos de entrada a su tipo correspondiente
    whitelist: true,  // Elimina las propiedades que no están en el DTO
    forbidNonWhitelisted: true,  // Si se envían propiedades que no están en el DTO, se lanzará un error
  }));

  await app.listen(3000);
}
bootstrap();
