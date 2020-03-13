import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { UserService } from "../_service/user.service";
import { Observable } from "rxjs";
import { timer } from 'rxjs';
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class UsernameValidator {

  public userService: UserService;

  searchUsername(text) {
    // debounce
    return timer(1000)
      .pipe(
        switchMap(() => {
          // Check if username is available
          return this.userService.usernameExists(text)
        })
      );
  }

  checkUsername(): AsyncValidatorFn {
    return(control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.searchUsername(control.value)
        .pipe(
          map(res => {
            // If username is taken
            if (res.length) {
              // return error
              console.log("Username match found: " + res);
              return {'usernameExists': true };
            } else {
              return null;
            }
          })
        );
    };

  }

}
