import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../users/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';
import { RoleService } from '../users/roles/role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  private async authenticated(user: User) {
    const roles = await this.roleService.getUserRoles(user.id);

    const payload = {
      sub: user.id,
      roles,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      expiresIn: this.configService.get('expiresIn'),
      accessToken,
      user: {
        name: user.username,
        avatar: user.avatar,
        email: user.email,
      },
    };
  }

  async login(credentials: LoginDto) {
    const user = await this.validateUser(
      credentials.email,
      credentials.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authenticated(user);
  }

  async register(userData: RegisterDto): Promise<any> {
    const user = await this.userService.create(userData);
    return this.authenticated(user);
  }
}
