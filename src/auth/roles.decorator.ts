import { SetMetadata } from '@nestjs/common';

// este es el decorador que se en el controlador
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
