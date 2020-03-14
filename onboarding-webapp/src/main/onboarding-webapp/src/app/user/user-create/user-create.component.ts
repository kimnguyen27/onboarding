import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserService } from "../../_service/user.service";
import { debounceTime } from "rxjs/internal/operators";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UsernameValidator } from "../../_validators/username-validator";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {

  @Input() users;
  userCreateForm: FormGroup = this.createFormGroup();
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private userService: UserService,
              private usernameValidator: UsernameValidator) {
  }

  ngOnInit() {
    this.subscriptions.push(this.userCreateForm.get('firstName').valueChanges
      .pipe(
        debounceTime(100)
      )
      .subscribe(v => {
        console.log("New firstName value is " + v);
      }));

    this.usernameValidator.userService = this.userService;

    console.log(this.userCreateForm);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  revert() {
    this.userCreateForm.reset();
  }

  onSubmit() {
    if (this.userCreateForm.valid) {
      this.saveUser();
      this.activeModal.close('Close submit');
    }
  }

  saveUser(): void {
    const valueToSave = {...this.userCreateForm.value};

    this.userService.create(valueToSave).subscribe(user => {
      this.userCreateForm.patchValue(user);
    });
    document.location.reload();
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'username': new FormControl('',
        [Validators.required],
        [this.usernameValidator.checkUsername()]
      ),
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required])
    });
  }
}
