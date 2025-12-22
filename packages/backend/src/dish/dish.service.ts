import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { strapiConfig } from '../config/strapi.config';

@Injectable()
export class DishService {
  private readonly resource = 'dishes';
  private readonly baseUrl = strapiConfig.baseUrl;

  constructor(private readonly httpService: HttpService) {}

  async getAll(): Promise<any> {
    const url = `${this.baseUrl}/api/${this.resource}?populate=*`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getOne(id: string): Promise<any> {
    const url = `${this.baseUrl}/api/${this.resource}/${id}?populate=*`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}




