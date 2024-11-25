"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Configurar la validación global
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true, // Para que convierta el tipo de los datos de entrada a su tipo correspondiente
        whitelist: true, // Elimina las propiedades que no están en el DTO
        forbidNonWhitelisted: true, // Si se envían propiedades que no están en el DTO, se lanzará un error
    }));
    await app.listen(3000);
}
bootstrap();
