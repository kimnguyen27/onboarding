import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': "Required"
    };

    return config[validatorName];
  }

  // Custom validators here:
}
