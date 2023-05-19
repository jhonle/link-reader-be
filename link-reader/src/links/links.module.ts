import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
