import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

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
    console.log(`sign JWT token for user: ${user}`);
    const payload = {
      userId: user._id,
      email: user.email,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }
  async login(user: any) {
    const userExist = await this.usersService.findOneByEmail(user.email);
    if (!userExist) {
      throw new UnauthorizedException('Unauthorized');
    }
    const isValidepassword = await compare(user.password, userExist.password);
    if (!isValidepassword) {
      // MDP invalide
      throw new UnauthorizedException('Unauthorized');
    }

    const payload = {
      userId: user._id,
      email: user.email,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      userId: user._id.toString(),
      username: user.username,
    };
  }
}
