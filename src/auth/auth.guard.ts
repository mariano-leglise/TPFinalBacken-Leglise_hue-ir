import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common'; // imnporto la excepción

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No token provided'); // mensaje de error
    }

    try {
      const token = authHeader.split(' ')[1]; // extraemos el token
      const user = await this.jwtService.verifyAsync(token); // verificamos el token de forma asíncrona
      request.user = user; // asignamos el usuario decodificado a la request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token'); 
    }
  }
}
