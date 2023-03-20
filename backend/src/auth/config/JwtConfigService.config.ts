import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { jwtConstants } from '../secrets';

export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    };
  }
}
