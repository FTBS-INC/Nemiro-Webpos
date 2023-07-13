import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[decimalFormat][ngModel]'
})
export class DecimalFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(value: number): void {
    const formattedValue = isNaN(value) ? '' : value.  toFixed(2);
    this.el.nativeElement.value = formattedValue;
  }
}
