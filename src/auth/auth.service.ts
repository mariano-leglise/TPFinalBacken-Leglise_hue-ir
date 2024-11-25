import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {}

  // Método para registrar un usuario
  async register(username: string, password: string, role: Role): Promise<User> {
    // Verifica si el username ya está registrado
    const existingUser = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new Error('El nombre de usuario ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prismaService.user.create({
      data: {
        username,
        password: hashedPassword,
        role, 
      },
    });
  }

  // método para hacer login
  async login(username: string, password: string): Promise<string> {
    // buscar al usuario por su username
    const user = await this.prismaService.user.findUnique({
      where: { username }, // buscar por username
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    // comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    // crear el payload para el token JWT
    const payload = { username: user.username, sub: user.id, role: user.role };

    // firmar y retornar el jwt
    return this.jwtService.sign(payload);
  }
}
