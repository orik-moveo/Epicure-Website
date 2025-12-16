import { Controller } from '@nestjs/common';
import { BaseStrapiController } from '../common/base-strapi.controller';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController extends BaseStrapiController {
  protected readonly resourcePath = 'restaurants';

  constructor(protected readonly service: RestaurantService) {
    super();
  }
}


