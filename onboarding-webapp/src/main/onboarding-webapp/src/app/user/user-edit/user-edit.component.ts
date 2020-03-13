import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../_service/user.service";
import { Subscription } from "rxjs";
import { debounceTime, delay } from "rxjs/internal/operators";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  userEditForm: FormGroup = this.createFormGroup();
  subscriptions: Subscription[] = [];
  loadingSubscription: Subscription = Subscription.EMPTY;

  @Input() activatedRoute;
  private userId: string;

  constructor(private formBuilder: FormBuilder,
              //private activatedRoute: ActivatedRoute,
              public activeModal: NgbActiveModal,
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

    console.log(this.userEditForm);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  saveIfValid() {
    if (this.userEditForm.valid) {
      this.saveUser();
      this.activeModal.close('Close enter');
    }
  }

  saveUser(): void {
     const valueToSave = {...this.userEditForm.value, userId: this.userId};

     this.userService.update(valueToSave).subscribe(user => {
       this.userEditForm.patchValue(user);
     });
    document.location.reload();
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'username': '',
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'phones': ''
    });
  }
}
