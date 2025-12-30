import { Controller, Get, Query } from '@nestjs/common';
import { BaseStrapiController } from '../common/base-strapi.controller';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController extends BaseStrapiController {
  protected readonly resourcePath = 'restaurants';

  constructor(protected readonly service: RestaurantService) {
    super();
  }

  @Get()
  override async getAll(@Query('filter') filter?: string) {
    try {
      return await this.service.getAll(filter);
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}
