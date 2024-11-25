"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core"); // para leer metadatos de los manejadores
const jwt_1 = require("@nestjs/jwt"); // para verificar el token 
let RolesGuard = class RolesGuard {
    reflector;
    jwtService;
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler()); // obtiene los roles requeridos del decorador
        if (!roles) {
            return true; // Si no hay roles, se permite el acceso
        }
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header missing');
        }
        const token = authHeader.split(' ')[1]; // extrae el token del header
        if (!token) {
            throw new common_1.UnauthorizedException('Token missing');
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
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, jwt_1.JwtService])
], RolesGuard);
