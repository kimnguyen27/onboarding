import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";
import {Subscription} from "rxjs";
import {debounceTime, delay} from "rxjs/internal/operators";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  formGroup: FormGroup = this.createFormGroup();
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
          this.formGroup.patchValue(user);
        });
    }));

    this.subscriptions.push(this.formGroup.get('firstName').valueChanges
      .pipe(
        debounceTime(100)
      )
      .subscribe(v => {
        console.log("the new value is " + v);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  save(): void {
     const valueToSave = {...this.formGroup.value, userId: this.userId};

     this.userService.update(valueToSave).subscribe(user => {
       this.formGroup.patchValue(user);
     })
  }


  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'firstName': '',
      'lastName': '',
      'username': ''
    });
  }

}
