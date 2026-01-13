import { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';
import type { StringValue } from 'ms';

export const jwtConfig = (config: ConfigService):JwtModuleOptions => ({
  secret: config.getOrThrow<string>('JWT_SECRET'),
  signOptions: {
    expiresIn: config.getOrThrow<StringValue>('JWT_EXPIRES_IN'),
  },
});
