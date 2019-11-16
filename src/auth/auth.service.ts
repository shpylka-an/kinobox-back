import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    // TODO instead add password hash check
    if (user && user.password === password) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  public async login(user: User): Promise<any | {status: number}> {
    return this.validate(user.username, user.password).then(user => {
      if (!user) {
        return {status: 404};
      }

      const payload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload);

      return {
        status: 'success',
        expires_in: 3600,
        access_token: accessToken,
      };
    });
  }

  public async register(userData: User): Promise<any> {
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
