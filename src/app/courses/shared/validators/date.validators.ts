import { Validators, FormControl } from '@angular/forms';

export class DateValidators {
  public static shouldMatchFormat(fc: FormControl) {
    let DATE_REGEXP = /^(0?[1-9]|1[012])[.](0?[1-9]|[12][0-9]|3[01])[.]\d{4}$/;
    return DATE_REGEXP.test(fc.value) ? null : { invalidDateFormat: true };
  }
}
