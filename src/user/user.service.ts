import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  // Obtener un usuario por su ID
  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Actualizar un usuario
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto, 
    });
  }

  // Eliminar un usuario
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
