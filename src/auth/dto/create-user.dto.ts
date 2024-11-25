import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Role } from '@prisma/client'; // para importar el enum Role desde el esquema de prisma

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username!: string; // Usamos `username` como campo de autenticación

  @IsString()
  @IsNotEmpty()
  password!: string; 

  @IsEnum(Role)  // para verificar que el role sea uno de los valores definidos en el enum Role
  @IsNotEmpty()
  role!: Role;
}
