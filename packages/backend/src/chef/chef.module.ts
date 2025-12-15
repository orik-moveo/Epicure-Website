import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChefController } from './chef.controller';
import { ChefService } from './chef.service';

@Module({
  imports: [HttpModule],
  controllers: [ChefController],
  providers: [ChefService],
})
export class ChefModule {}
