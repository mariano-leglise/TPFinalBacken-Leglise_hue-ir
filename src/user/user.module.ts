import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; // importamos AuthModule para usar JwtService y AuthGuard

@Module({
  imports: [AuthModule], 
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
