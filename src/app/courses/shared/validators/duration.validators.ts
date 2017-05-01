import { Validators, FormControl } from '@angular/forms';

export class DurationValidators {
  public static shouldContainNumbersOnly(fc: FormControl) {
    let DURATION_REGEXP = /^\d+$/;
    return DURATION_REGEXP.test(fc.value) ? null : { invalidDurationFormat: true };
  }
}
