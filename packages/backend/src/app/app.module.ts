import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChefModule } from '../chef/chef.module';
import { DishModule } from '../dish/dish.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { HomepageModule } from '../homepage/homepage.module';

@Module({
  imports: [ChefModule, DishModule, RestaurantModule, HomepageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


