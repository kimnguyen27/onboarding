import { Injectable } from '@angular/core';
import {FormControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  // debouncer: any;
  // usernames: string[];

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': "Required field",
      'pattern': "Incorrect number format",
      'usernameValidator': "Username is taken."
    };

    return config[validatorName];
  }

  // static checkUsername(control) {
  //
  //   clearTimeout(this.debouncer);
  //
  //   return new Promise(resolve => {
  //
  //     this.debouncer = setTimeout(() => {
  //
  //       for (let username of this.usernames) {
  //
  //         //console.log(`Username: checking ${control.value} against ${username}`);
  //
  //         if (control.value !== username) {
  //
  //           console.log(`Username match: no matches found`);
  //
  //           resolve(null);
  //
  //         } else if (control.value === username) {
  //
  //           console.log(`Username match: ${username}`);
  //
  //           resolve({'usernameValidator': true});
  //
  //           break;
  //         }
  //
  //       }
  //
  //     }, 1000);
  //
  //   });
  //
  // }
}
