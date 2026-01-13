import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChefModule } from '../chef/chef.module';
import { DishModule } from '../dish/dish.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { HomepageModule } from '../homepage/homepage.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ori',
      password: 'ori12345',
      database: 'epicure',
      autoLoadEntities: true,
      synchronize: true,
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
