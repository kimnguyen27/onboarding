import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': "Required field",
      'pattern': "Incorrect phone number format"
    };

    return config[validatorName];
  }

  // Custom validators here:
}
