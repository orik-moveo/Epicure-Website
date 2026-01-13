import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChefModule } from '../chef/chef.module';
import { DishModule } from '../dish/dish.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { HomepageModule } from '../homepage/homepage.module';
import { AuthModule } from '../auth/auth.module';
import { typeOrmConfig } from '../config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    AuthModule,
    ChefModule,
    DishModule,
    RestaurantModule,
    HomepageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
