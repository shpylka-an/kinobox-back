import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginData: LoginDto): Promise<any> {
    return await this.authService.login(loginData);
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() registerData: RegisterDto): Promise<any> {
    return await this.authService.register(registerData);
  }
}
