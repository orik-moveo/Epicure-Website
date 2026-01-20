import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;

    if (method === 'GET') {
      return true;
    }

    const requestedWith = request.headers['x-requested-with'];

    if (requestedWith !== 'XMLHttpRequest') {
      throw new ForbiddenException('CSRF token validation failed');
    }

    return true;
  }
}
