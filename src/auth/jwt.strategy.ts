import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface'; //para definir la estructura del payload
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extrae el token del encabezado Authorization
      secretOrKey: 'SECRET_KEY', 
    });
  }

  async validate(payload: JwtPayload) {
    //  verificamos si el usuario existe en la base de datos
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub }, // lo validamos con el id del usuario
    });
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user; // devolvemos el usuario validado para que pueda acceder a la ruta
  }
}
