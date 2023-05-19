import { Injectable, ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, Observable } from 'rxjs';

@Injectable()
export class LinksService {
  constructor(private http: HttpService) {}

  scrapeLinks(link: string): Observable<object> {
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
      )
      .pipe(
        catchError((error: any) => {
          throw new ForbiddenException(`Error processing the link: ${error}`);
        }),
      );
  }
}
