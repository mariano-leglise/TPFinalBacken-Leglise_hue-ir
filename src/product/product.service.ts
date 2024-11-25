import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto, 
    });
  }

  // Permite que el retorno sea null en caso de que no se encuentre el producto
  async getProductById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async updateProduct(id: number, updateProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
