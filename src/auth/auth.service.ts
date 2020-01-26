import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
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

  private async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  private authenticated(user: User) {
    const payload = {sub: user.id, name: user.username};
    const accessToken = this.jwtService.sign(payload);

    return {
      status: 'success',
      expires_in: 3600,
      access_token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        first_name: user.firstName,
        last_name: user.lastName,
        avatar: user.avatar,
        email: user.email,
      },
    };
  }

  public async login(credentials: LoginDto): Promise<any> {
    const user = await this.validate(credentials.email, credentials.password);

    if (!user) {
      throw new NotFoundException('Invalid credentials', 'User not found');
    }

    return this.authenticated(user);
  }

  public async register(userData: RegisterDto): Promise<any> {
    userData.password = await bcrypt.hash(userData.password, 12);
    const user = await this.userService.create(userData);

    if (!user) {
      return {status: 'error on registration'};
    }

    return this.authenticated(user);
  }
}
