import {
    Controller,
    Get,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    ParseIntPipe,
    NotFoundException,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { RolesGuard } from '../auth/roles.guard';
  import { Roles } from '../auth/roles.decorator';
  import { AuthGuard } from '../auth/auth.guard';
  import { UpdateUserDto } from './dto/update-user.dto';
  
  @Controller('users')
  @UseGuards(AuthGuard, RolesGuard) // Aplica los guards a todas las rutas
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    // Obtener todos los usuarios 
    @Roles('SUPERADMIN') // Solo Superadmin tiene acceso
    async getUsers() {
      return this.userService.getAllUsers();
    }
  
    // Obtener un usuario por ID 
    @Get(':id')
    @Roles('SUPERADMIN') // Solo Superadmin tiene acceso
    async getUserById(@Param('id', ParseIntPipe) id: number) {
      const user = await this.userService.getUserById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    }
  
    // Actualizar un usuario 
    @Put(':id')
    @Roles('SUPERADMIN') // Solo Superadmin tiene acceso
    async updateUser(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userService.updateUser(id, updateUserDto);
    }
  
    // Eliminar un usuario 
    @Delete(':id')
    @Roles('SUPERADMIN') // Solo Superadmin tiene acceso
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
      return this.userService.deleteUser(id);
    }
  }
  