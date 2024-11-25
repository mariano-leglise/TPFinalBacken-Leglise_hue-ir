"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
// src/app.module.ts
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product/product.controller"); // Asegúrate de importar el controlador
const product_service_1 = require("./product/product.service"); // Asegúrate de importar el servicio
const prisma_service_1 = require("../prisma/prisma.service"); // Importa el servicio de Prisma
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [], // Aquí puedes incluir otros módulos si es necesario
        controllers: [product_controller_1.ProductController], // Registra el controlador de productos
        providers: [product_service_1.ProductService, prisma_service_1.PrismaService], // Registra los servicios necesarios
    })
], AppModule);
