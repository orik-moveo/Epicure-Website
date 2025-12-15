import { Controller } from '@nestjs/common';
import { BaseStrapiController } from '../common/base-strapi.controller';
import { ChefService } from './chef.service';

@Controller('chefs')
export class ChefController extends BaseStrapiController {
  protected readonly resourcePath = 'chefs';

  constructor(protected readonly service: ChefService) {
    super();
  }
}
