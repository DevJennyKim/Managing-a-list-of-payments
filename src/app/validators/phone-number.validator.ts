import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isValidPhoneNumber } from 'libphonenumber-js';

export function phoneNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const phoneNumber = control.value;

  if (isValidPhoneNumber(phoneNumber)) {
    return null;
  }

  return { invalidPhoneNumber: true };
}
