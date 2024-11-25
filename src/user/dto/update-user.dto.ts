import { IsString, IsOptional, IsEnum } from 'class-validator';

enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UpdateUserDto {
  @IsString()
  @IsOptional() 
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(Role) 
  @IsOptional()
  role?: Role;
}
