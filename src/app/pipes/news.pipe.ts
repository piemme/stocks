import { Pipe, PipeTransform } from '@angular/core';
import { StocksService } from '../services/stocks.service';

@Pipe({
  name: 'news',
  pure: false
})
export class NewsPipe implements PipeTransform {
  cachedSource: string = '';
  news: string = 'loading...';

  constructor(private service: StocksService) {}

  transform(source: string, args?: any): any {
    if (source !== this.cachedSource) {
      this.cachedSource = source;

      this.service.getNewsSnapshot(source)
        .subscribe(response => {
          let data = response.json();
          this.news = `<a href="${data.url}" target="_blank">${data.title}</a>`;
        });
    }

    return this.news;
  }
}
