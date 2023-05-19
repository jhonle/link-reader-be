import { Injectable, ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, concatMap, catchError, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from 'src/entities/links.entity';

@Injectable()
export class LinksService {
  constructor(
    private http: HttpService,
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  scrapeLinks(link: string): Observable<any> {
    const linkRegEx = /<a.*>.*<\/a>/g;
    return this.http
      .get(link)
      .pipe(
        map((response: any) => response.data),
        map((text: string) => {
          const linksFound = text.match(linkRegEx);
          const countLinks = {};

          linksFound.forEach((link) => {
            countLinks[link] = (countLinks[link] || 0) + 1;
          });
          return countLinks;
        }),
        concatMap((text: any) => {
          return this.linkRepository.save({ links: JSON.stringify(text) });
        }),
      )
      .pipe(
        catchError((error: any) => {
          throw new ForbiddenException(`Error processing the link: ${error}`);
        }),
      );
  }
}
