import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { strapiConfig } from '../config/strapi.config';
import { filterOpenNow } from './utils/restaurant.utils';

@Injectable()
export class RestaurantService {
  private readonly resource = 'restaurants';
  private readonly baseUrl = strapiConfig.baseUrl;

  constructor(private readonly httpService: HttpService) {}

  async getAll(filter?: string): Promise<any> {
    let url = `${this.baseUrl}/api/${this.resource}?populate=*`;
    const params: string[] = [];

    switch (filter) {
      case 'new':
        params.push('sort=createdAt:desc');
        params.push('pagination[limit]=10');
        break;

      case 'mostPopular':
        params.push('filters[isPopular][$eq]=true');
        break;

      case 'openNow':
        const allResponse = await firstValueFrom(this.httpService.get(url));
        const filteredData = filterOpenNow(allResponse.data);
        return filteredData;

      case 'all':
      case undefined:
      default:
        // No additional filtering
        break;
    }

    // Build final URL with query parameters
    if (params.length > 0) {
      url += `&${params.join('&')}`;
    }

    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getOne(id: string): Promise<any> {
    const url = `${this.baseUrl}/api/${this.resource}/${id}?populate=*`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
