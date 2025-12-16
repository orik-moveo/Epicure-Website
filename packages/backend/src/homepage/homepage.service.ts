import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { strapiConfig } from '../config/strapi.config';

@Injectable()
export class HomepageService {
  private readonly resource = 'homepage';
  private readonly baseUrl = strapiConfig.baseUrl;

  constructor(private readonly httpService: HttpService) {}

  async get(): Promise<any> {
    const url = `${this.baseUrl}/api/${this.resource}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
