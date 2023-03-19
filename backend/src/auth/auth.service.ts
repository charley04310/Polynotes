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
    console.log(
      `[AuthService] validateUser: email=${email}, password=${password}`,
    );
    const user = await this.usersService.findOneByEmail(email);
    return user;
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
