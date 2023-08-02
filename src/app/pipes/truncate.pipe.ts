import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(str: string, limit: number = 30): string {
    if (str.length > limit) {
      return str.substr(0, limit) + '...';
    }
    return str;
  }
}
