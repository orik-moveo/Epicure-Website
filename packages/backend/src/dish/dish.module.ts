import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';

@Module({
  imports: [HttpModule],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
