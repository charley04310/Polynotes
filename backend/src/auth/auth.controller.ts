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
} from '@nestjs/common';
import { AuthService } from './auth.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoginUserDto } from '../users/dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

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
        .cookie('polynote-JWT', user.access_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'none',
        })
        .send({
          message: 'Logged in successfully 😊 👌',
          user: {
            user_email: user.email,
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

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('polynote-JWT').json('Logged out successfully 😊 👌');
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
