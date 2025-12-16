import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';

@Module({
  imports: [HttpModule],
  controllers: [HomepageController],
  providers: [HomepageService],
})
export class HomepageModule {}
