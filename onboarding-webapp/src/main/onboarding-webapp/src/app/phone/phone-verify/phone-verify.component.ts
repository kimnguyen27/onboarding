import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { PhoneService } from "../../service/phone.service";
import {PhoneModel} from "../../model/phone.model";
import {delay} from "rxjs/internal/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-phone-verify',
  templateUrl: './phone-verify.component.html',
  styleUrls: ['./phone-verify.component.css']
})
export class PhoneVerifyComponent implements OnInit, OnDestroy {

  //@Input() activatedRoute;
  @Input() fromParentList;
  @Input() userId;

  loadingSubscription: Subscription = Subscription.EMPTY;

  protected phoneVerifyForm: FormGroup = this.createFormGroup();
  protected phone: PhoneModel;
  protected prompt: string;
  public verified: boolean;

  constructor(public activeModal: NgbActiveModal,
              protected formBuilder: FormBuilder,
              protected phoneService: PhoneService) {
  }

  ngOnInit(): void {
    //this.verifyInit();
    this.phone = this.fromParentList;
    console.log(this.fromParentList);
    this.prompt = `A verification code has been sent to the phone number "${this.phone.phoneNumber}"`;

    this.loadingSubscription = this.phoneService.get(this.userId, this.phone.phoneId)
      .pipe(
        delay(1000)
      ).subscribe(() => {})
  }

  ngOnDestroy() {
  }

  protected createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'verificationCode': [
        '', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(new RegExp('^[0-9]*$'))
        ]
      ],
      'verified': 'false'
    });
  }
}
