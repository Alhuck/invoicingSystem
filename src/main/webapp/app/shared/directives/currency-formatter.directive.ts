import { Directive, ElementRef, Renderer, Input, HostListener, OnInit, HostBinding } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[currencyFormatter]'
})
export class CurrencyFormatterDirective implements OnInit {
  @Input() currencyFormatter?: any;
  @Input() ngModel: any;

  constructor(public model: NgModel, private el: ElementRef, private renderer: Renderer) {}

  ngOnInit(): void {
    // this.changeCurrencyFormat();
    // this.el.nativeElement.value = 100;
    // // console.log(this.el.nativeElement);
    // // eslint-disable-next-line no-console
    // console.log(this.el.nativeElement.value);
  }

  // @HostBinding('value') inp: any;
  // onInputChange() : void {
  //   const value = this.ngModel;
  //   // this.ngModel.update(Number(value).toFixed(2));
  //   this.model.viewToModelUpdate(value);
  //   this.model.valueAccessor ? this.model.valueAccessor.writeValue(Number(value).toFixed(2)) : 0;
  // }

  @HostListener('blur', ['$event'])
  changeCurrencyFormat(): void {
    const value = this.ngModel;
    // this.ngModel.update(Number(value).toFixed(2));
    this.model.viewToModelUpdate(value);
    this.model.valueAccessor ? this.model.valueAccessor.writeValue(Number(value).toFixed(2)) : 0;

    // console.log();
  }
}
