import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})

export class CurrencyPipe implements PipeTransform {

  transform(value: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    return formatter.format(value);
  }

}
