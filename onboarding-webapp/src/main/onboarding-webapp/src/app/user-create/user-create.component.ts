import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserService} from "../service/user.service";
import {debounceTime} from "rxjs/internal/operators";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {

  userCreateForm: FormGroup = this.createFormGroup();
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.userCreateForm.get('firstName').valueChanges
      .pipe(
        debounceTime(100)
      )
      .subscribe(v => {
        console.log("New firstName value is " + v);
      }));

    // if (this.userCreateForm.get('username').value == null) {
    //   this.isReadOnly = false;
    // }

    console.log(this.userCreateForm);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  saveUser(): void {
    const valueToSave = {...this.userCreateForm.value};

    this.userService.create(valueToSave).subscribe(user => {
      this.userCreateForm.patchValue(user);
    })
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'username': ['', Validators.required],  // TODO: Add validation check for taken username
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required]
    });
  }

}
