import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChefModule } from '../chef/chef.module';
import { DishModule } from '../dish/dish.module';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [ChefModule, DishModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
