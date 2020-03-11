import { Injectable } from "@angular/core";
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";

@Injectable()
export class UsernameValidator {

  debouncer: any;
  usernames: string[];

  constructor() {
  }

  checkUsername(control: AbstractControl): ValidationErrors | null {

    clearTimeout(this.debouncer);

    // this.debouncer = setTimeout(() => {
    //
    //   for (let username of this.usernames) {
    //     console.log(`Username: checking ${control.value} against ${username}`);
    //
    //     if (control.value !== username) {
    //
    //       console.log(`Username match: no matches found`);
    //       return null;
    //
    //     } else if (control.value === username) {
    //
    //       console.log(`Username match: ${username}`);
    //       return {'usernameValidator': true};
    //     }
    //
    //   }
    //
    // }, 1000);

    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {

        for (let username of this.usernames) {
          console.log(`Username: checking ${control.value} against ${username}`);

          if (control.value !== username) {

            //console.log(`Username match: no matches found`);
            resolve(null);

          } else if (control.value === username) {

            console.log(`Username match: ${username}`);
            resolve({'usernameValidator': true});
            break;
          }

        }

      }, 1000);

    });

  }

}
