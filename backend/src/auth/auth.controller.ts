import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Param,
  Redirect,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoginUserDto } from '../users/dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Request as ExpressRequest, Response } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    try {
      const user = await this.authService.login(req.user);
      response
        .cookie('polynote', user.access_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
        })
        .send({
          message: 'Logged in successfully 😊 👌',
          user: {
            userId: user.userId,
            email: user.email,
            username: user.username,
          },
        });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Email address already exists. Please try again.',
        HttpStatus.CONFLICT,
      );
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('auto-login')
  async autoLogin(@Req() request: any) {
    const user = request.user;
    return {
      message: 'Logged in successfully 😊 👌',
      user: {
        userId: user.userId,
        email: user.email,
        username: user.username,
      },
      status: HttpStatus.OK,
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    const cookie = response.clearCookie('polynote');
    if (!cookie)
      throw new HttpException(
        'Aucun cookie Polynote présent !!',
        HttpStatus.BAD_REQUEST,
      );
    return {
      message: 'Logged out successfully 😊 👌',
    };
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    try {
      const { username, email } = createUserDto;
      await this.usersService.create(createUserDto);
      const token = await this.authService.singnJwtToken(createUserDto);
      await this.usersService.sendEmailConfirmation(email, token, username);
      return `A verification email has been sent to the following email address: ${createUserDto.email}`;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Email address already exists. Please try again.',
        HttpStatus.CONFLICT,
      );
    }
  }

  @Get('email-verification/:token')
  @Redirect('https://nestjs.com', 301)
  async verifyTokenAuthentification(@Param('token') token: string) {
    const decodedToken = await this.authService.decodeJwtToken(token);
    if (typeof decodedToken === 'string') {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    await this.usersService.emailUserConfirmation(decodedToken);
  }
}
