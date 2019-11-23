import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(username);
    // TODO instead add password hash check
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  public async login(credentials: LoginDto): Promise<any | { status: number }> {
    const user = await this.validate(credentials.username, credentials.password);

    if (!user) {
      return {status: 404};
    }

    const payload = {username: user.username, sub: user.id};
    const accessToken = this.jwtService.sign(payload);

    return {
      status: 'success',
      expires_in: 3600,
      access_token: accessToken,
    };
  }

  public async register(userData: RegisterDto): Promise<any> {
    const user = await this.userService.create(userData);

    if (!user) {
      return {status: 'error on registration'};
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      status: 'success',
      expires_in: 3600,
      access_token: accessToken,
    };
  }
}
