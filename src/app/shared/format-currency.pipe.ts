import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatCurrency',
    standalone: false
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(amount: number, currencyCode: string): string {
    try {
      const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(amount);
      return formattedAmount;
    } catch (error) {
      console.error('Invalid currency code:', currencyCode);
      return `${currencyCode} ${amount}`;
    }
  }
}
