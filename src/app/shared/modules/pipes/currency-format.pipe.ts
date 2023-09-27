import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: string): string {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      return '';
    }
    const formattedValue = parsedValue.toFixed(2);
    return '$' + formattedValue;
  }
}
