import { Controller, Get, NotFoundException, BadGatewayException, ServiceUnavailableException } from '@nestjs/common';
import { HomepageService } from './homepage.service';

@Controller('homepage')
export class HomepageController {
  constructor(private readonly service: HomepageService) {}

  @Get()
  async get() {
    try {
      return await this.service.get();
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.status === 404 || error.response?.status === 404) {
      throw new NotFoundException('homepage not found');
    }

    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      throw new ServiceUnavailableException('Strapi service is unavailable');
    }

    if (error.response?.status) {
      throw new BadGatewayException('Error communicating with Strapi');
    }

    throw error;
  }
}
