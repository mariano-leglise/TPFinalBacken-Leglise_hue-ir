import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from './auth.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthGuard, PrismaService],
  exports: [AuthService, JwtModule, AuthGuard], // Exporta JwtModule y AuthGuard
})
export class AuthModule {}
