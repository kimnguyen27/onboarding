import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { debounceTime } from "rxjs/operators";

@Injectable()
export class UsernameValidator {

  static checkUsername(userService: UserService): ValidationErrors | null {

    return(control: AbstractControl) => {
      return userService.usernameExists(control.value)
        .pipe(
          debounceTime(1000)
        )
        .subscribe( result => {
          if (result) {
            console.log(`Username "${control.value}" exists`);
            return {'usernameValidator': true};
          } else {
            console.log(`Username "${control.value}" does not exist`);
            return null;
          }
        });
    };

  }

}
