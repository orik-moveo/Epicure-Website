import { Controller, Post, Body, UseGuards, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
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
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const authResponse = await this.authService.register(registerDto);
    this.setAuthCookie(res, authResponse.token);
    return { user: authResponse.user };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const authResponse = await this.authService.login(loginDto);
    this.setAuthCookie(res, authResponse.token);
    return { user: authResponse.user };
  }

  @UseGuards(AuthGuardJwt)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.clearAuthCookie(res);
    return { message: 'Logged out successfully' };
  }

  @UseGuards(AuthGuardJwt)
  @Get('me')
  async me(@GetUser() jwtPayload: JwtPayload) {
    const user = await this.authService.getUserById(jwtPayload.sub);
    return { user };
  }

  private setAuthCookie(res: Response, token: string): void {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: '/',
    });
  }

  private clearAuthCookie(res: Response): void {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }
}
