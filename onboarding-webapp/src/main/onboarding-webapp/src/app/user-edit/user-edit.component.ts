import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../service/user.service";
import {Subscription} from "rxjs";
import {debounceTime, delay} from "rxjs/internal/operators";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  userEditForm: FormGroup = this.createFormGroup();
  subscriptions: Subscription[] = [];
  loadingSubscription: Subscription = Subscription.EMPTY;

  private userId: string;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.loadingSubscription = this.userService.get(this.userId)
        .pipe(
           delay(1000)
        ).subscribe(user => {
          this.userEditForm.patchValue(user);
        });
    }));

    this.subscriptions.push(this.userEditForm.get('firstName').valueChanges
      .pipe(
        debounceTime(100)
      )
      .subscribe(v => {
        console.log("New firstName value is " + v);
      }));

    if('username' != null) {
      //this.userEditForm.get('username').disable();
    }
    console.log(this.userEditForm);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  saveUser(): void {
     const valueToSave = {...this.userEditForm.value, userId: this.userId};

     this.userService.update(valueToSave).subscribe(user => {
       this.userEditForm.patchValue(user);
     })
  }


  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'username': '',
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required]
    });
  }

}
