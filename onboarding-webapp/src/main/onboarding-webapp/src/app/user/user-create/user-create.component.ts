import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {debounceTime} from "rxjs/internal/operators";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

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



    console.log(this.userCreateForm);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  saveIfValid() {
    if (this.userCreateForm.valid) {
      this.saveUser();
      this.activeModal.close('Close enter');
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
      // FIXME: validation check for taken username
      'username': [
        '',
        [Validators.required,
          //UsernameValidator.checkUsername(this.userService)
        ]
      ],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required]
    });
  }
}
