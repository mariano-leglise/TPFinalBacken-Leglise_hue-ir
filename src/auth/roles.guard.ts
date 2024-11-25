import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // para leer metadatos de los manejadores
import { JwtService } from '@nestjs/jwt'; // para verificar el token 
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()); // obtiene los roles requeridos del decorador
    if (!roles) {
      return true; // Si no hay roles, se permite el acceso
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1]; // extrae el token del header
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      // verifica el token y obtiene el payload
      const payload = this.jwtService.verify(token);

      // valida si el rol del usuario está dentro de los roles permitidos
      const hasRole = roles.includes(payload.role);
      if (!hasRole) {
        return false; // Si no tiene un rol válido, acceso denegado
      }

      request['user'] = payload;
      return true; 
    } catch (error) {
      throw new UnauthorizedException('Invalid token'); 
    }
  }
}
