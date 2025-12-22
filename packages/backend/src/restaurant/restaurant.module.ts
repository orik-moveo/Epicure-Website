import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [HttpModule],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}




