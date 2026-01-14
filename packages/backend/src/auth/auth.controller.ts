import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../../../shared/dto/auth/login.dto';
import { RegisterDto } from '../../../shared/dto/auth/register.dto';
import { AuthGuardJwt } from './guards/authGuardJwt';
import { GetUser } from './decorators/getUser.decorator';
import type { JwtPayload } from './interfaces/jwtPayload.interface';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuardJwt)
  @Get('test')
  test(@GetUser() user: JwtPayload) {
    return user;
  }
}
