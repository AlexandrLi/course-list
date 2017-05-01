import { Validators, FormControl } from '@angular/forms';

export class AuthorsValidators {
  public static shouldCheckedAtLeastOne(fc: FormControl) {
    return fc.value.length > 0 ? null : { nothingChecked: true };
  }
}
