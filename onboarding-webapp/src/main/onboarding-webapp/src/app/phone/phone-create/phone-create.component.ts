import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PhoneService} from "../../_service/phone.service";
import {debounceTime} from "rxjs/internal/operators";

@Component({
  selector: 'app-phone-create',
  templateUrl: './phone-create.component.html',
  styleUrls: ['./phone-create.component.css']
})
export class PhoneCreateComponent implements OnInit, OnDestroy {

  phoneCreateForm: FormGroup = this.createFormGroup();
  subscriptions: Subscription[] = [];
  @Input() userId;

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private phoneService: PhoneService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.phoneCreateForm.get('phoneNumber').valueChanges
      .pipe(
        debounceTime(100)
      )
      .subscribe(v => {
        console.log("New phoneNumber value is " + v);
      }));

    console.log(this.phoneCreateForm);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  saveIfValid() {
    if (this.phoneCreateForm.valid) {
      this.savePhone();
      this.activeModal.close('Close enter');
    }
  }

  savePhone(): void {
    const valueToSave = {...this.phoneCreateForm.value, userId: this.userId};

    this.phoneService.create(this.userId, valueToSave).subscribe(phone => {
      this.phoneCreateForm.patchValue(phone);
    });
    document.location.reload();
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'phoneNumber': [
        '', [
        Validators.required,
        Validators.pattern(new RegExp('^\\+[1-9]\\d{1,14}$')) // Validating for e.164 phone format
        ]
      ],
      'verified': 'false'
    });
  }
}
