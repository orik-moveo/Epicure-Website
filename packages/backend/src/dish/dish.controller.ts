import { Controller } from '@nestjs/common';
import { BaseStrapiController } from '../common/base-strapi.controller';
import { DishService } from './dish.service';

@Controller('dishes')
export class DishController extends BaseStrapiController {
  protected readonly resourcePath = 'dishes';

  constructor(protected readonly service: DishService) {
    super();
  }
}
