import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class AppModule {}
