import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    const user = await this.userService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  private authenticated(user: User) {
    const payload = {sub: user.id, name: user.username};
    const accessToken = this.jwtService.sign(payload);

    return {
      expires_in: 86400,
      access_token: accessToken,
    };
  }

  public async login(credentials: LoginDto): Promise<any> {
    const user = await this.validate(credentials.email, credentials.password);

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    return this.authenticated(user);
  }

  public async register(userData: RegisterDto): Promise<any> {
    userData.password = await bcrypt.hash(userData.password, 12);
    try {
      const user = await this.userService.create(userData);

      return this.authenticated(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User with this email already exists');
      }
    }
  }
}
