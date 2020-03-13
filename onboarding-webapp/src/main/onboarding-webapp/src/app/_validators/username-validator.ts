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
          // return this.userService.findByUsername(text)
          return this.userService.usernameExists(text)
        })
      );
  }

  checkUsername(): AsyncValidatorFn {
    return(control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.searchUsername(control.value)
        .pipe(
          map(res => {
            console.log("Username taken: " + res);
            return (res) ? {'usernameExists': true} : null;
          })
        );
    };

  }

}
