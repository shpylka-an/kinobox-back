import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: LoginDto): Promise<any> {
    return this.authService.login(loginData);
  }

  @Post('register')
  async register(@Body() registerData: RegisterDto): Promise<any> {
    return this.authService.register(registerData);
  }
}
