import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    return user;
  }

  async decodeJwtToken(token: string) {
    const decodedToken = this.jwtService.decode(token);
    return decodedToken;
  }
  async singnJwtToken(user: any) {
    const payload = { email: user.email, name: user.username };
    const token = this.jwtService.sign(payload);
    return token;
  }
  async login(user: any) {
    const payload = { email: user.email, name: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      username: user.username,
    };
  }
}
