import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, NotFoundException, UsePipes } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator'; // decorador de roles
import { PrismaClient } from '@prisma/client';  
import { CreateProductDto } from './dto/create-product.dto'; // importamos el dto
import * as Joi from 'joi';  // importamos Joi
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';  // importamos el pipe JoiValidationPipe

const prisma = new PrismaClient();  // Creamos una instancia de PrismaClient

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ruta para obtener todos los productos (solo ADMIN y SUPERADMIN pueden acceder)
  @Get()
  @UseGuards(AuthGuard, RolesGuard)  // Aplica los guardias
  @Roles('ADMIN', 'SUPERADMIN')  // Solo los roles ADMIN y SUPERADMIN pueden acceder
  async getProducts(): Promise<any[]> { 
    return this.productService.getAllProducts();
  }

  // Ruta para crear un producto (solo SUPERADMIN puede hacerlo)
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPERADMIN') // Solo SUPERADMIN puede acceder
  @UsePipes(new JoiValidationPipe(Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().positive().required(),
  })))
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<any> {
    return this.productService.createProduct(createProductDto);
  }

  // Ruta para obtener un producto por ID (solo ADMIN y SUPERADMIN pueden acceder)
  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  async getProductById(@Param('id') id: number): Promise<any> {  
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Ruta para actualizar un producto (solo SUPERADMIN puede hacerlo)
  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  async updateProduct(
    @Param('id') id: number, 
    @Body() createProductDto: CreateProductDto
  ): Promise<any> {
    console.log('Received Product Data:', createProductDto); 
    return this.productService.updateProduct(id, createProductDto);
  }
  
  
  

  // Ruta para eliminar un producto (solo SUPERADMIN puede hacerlo)
  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  async deleteProduct(@Param('id') id: number): Promise<any> { 
    return this.productService.deleteProduct(id);
  }
}
