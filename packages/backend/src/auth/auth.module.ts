import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
