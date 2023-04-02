import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

export class JwtConfigService implements JwtOptionsFactory {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '5h' },
    };
  }
}
