import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CUSTOM_AUTHORS_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => AuthorsComponent),
  multi: true
};

@Component({
  selector: 'authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [CUSTOM_AUTHORS_VALUE_ACCESSOR]
})

export class AuthorsComponent implements ControlValueAccessor {
  @Input() public items: any[];
  @Input() public checkedAuthors: any[];
  // tslint:disable-next-line:no-empty
  public onChange: any = () => { };
  // tslint:disable-next-line:no-empty
  public onTouched: any = () => { };

  public setValue(value) {
    this.value = value.target.value;
  }

  get value() {
    return this.value;
  }

  set value(val) {
    let currentIndex = this.checkedAuthors.findIndex((item) => item.id == val);
    if (currentIndex !== -1) {
      this.checkedAuthors.splice(currentIndex, 1);
    } else {
      this.checkedAuthors.push(this.items.find((item) => item.id == val));
    }
    this.onChange(this.checkedAuthors);
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

  public isChecked(id): boolean {
    return this.checkedAuthors.some((author) => author.id === id);
  }
}
