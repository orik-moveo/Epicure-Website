import { Get, Param, NotFoundException, BadGatewayException, ServiceUnavailableException } from '@nestjs/common';

export interface StrapiService {
  getAll(): Promise<any>;
  getOne(id: string): Promise<any>;
}

export abstract class BaseStrapiController {
  protected abstract readonly service: StrapiService;
  protected abstract readonly resourcePath: string;

  @Get()
  async getAll() {
    try {
      return await this.service.getAll();
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    try {
      return await this.service.getOne(id);
    } catch (error) {
      return this.handleError(error, id);
    }
  }

  private handleError(error: any, id?: string) {
    if (error.status === 404 || error.response?.status === 404) {
      const resource = id 
        ? `${this.resourcePath} with id ${id}` 
        : this.resourcePath;
      throw new NotFoundException(`${resource} not found`);
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

