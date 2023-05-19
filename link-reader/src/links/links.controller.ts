import { Controller, Get, Res, Query } from '@nestjs/common';
import { LinksService } from './links.service';
import { Response } from 'express';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  scrapeLinks(@Query('link') link: string, @Res() response: Response): any {
    this.linksService.scrapeLinks(link).subscribe({
      next: (links) => response.status(200).send(links),
      error: (error) => response.status(500).send(error),
      complete: () => {
        console.info('complete');
      },
    });
  }
}
