import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CUSTOM_DATE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => DateComponent),
  multi: true
};

@Component({
  selector: 'date',
  // tslint:disable-next-line:max-line-length
  template: `<input type="text" id="date" [value]="value" (input)="setValue($event)" (blur)="onTouched()">`,
  providers: [CUSTOM_DATE_VALUE_ACCESSOR]
})

export class DateComponent implements ControlValueAccessor {
  // tslint:disable-next-line:no-input-rename
  @Input('value') public _value: string = '';

  // tslint:disable-next-line:no-empty
  public onChange: any = () => { };
  // tslint:disable-next-line:no-empty
  public onTouched: any = () => { };

  public setValue(value) {
    console.log(value.target);
    this.value = value.target.value;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  public registerOnChange(fn) {
    this.onChange = fn;
  }

  public registerOnTouched(fn) {
    this.onTouched = fn;
  }

  public writeValue(value) {
    if (value) {
      this.value = value;
    }
  }
}
