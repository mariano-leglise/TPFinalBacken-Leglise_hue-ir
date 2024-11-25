import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';  //importamos el dto de creación de usuario
import { LoginDto } from './dto/login.dto';  //importamos el dto  de login

@Controller('auth') // Ruta base para todas las rutas en este controlador
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ruta de login usando LoginDto
  @Post('login') // ruta: /auth/login
  async login(@Body() loginDto: LoginDto) {
    // llamamos al método de login de AuthService
    return this.authService.login(loginDto.username, loginDto.password);
  }

  // ruta de registro usando CreateUserDto
  @Post('register') // ruta:  /auth/register
  async register(@Body() createUserDto: CreateUserDto) {
    // Llamamos al método de registro de AuthService, pasando los datos del DTO
    return this.authService.register(
      createUserDto.username,
      createUserDto.password,
      createUserDto.role,  
    );
  }
}
