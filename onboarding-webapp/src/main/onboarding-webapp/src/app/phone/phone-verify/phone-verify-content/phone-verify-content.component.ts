import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { PhoneModel } from "../../../model/phone.model";
import {debounceTime, delay} from "rxjs/internal/operators";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {PhoneVerifyComponent} from "../phone-verify.component";

@Component({
  selector: 'app-phone-verify-content',
  templateUrl: './phone-verify-content.component.html',
  styleUrls: ['./phone-verify-content.component.css']
})
export class PhoneVerifyContentComponent extends PhoneVerifyComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  private code: string;
  faCheckCircle = faCheckCircle;

  ngOnInit(): void {
    // this.subscriptions.push(super.activatedRoute.params.subscribe(() => {
    //   this.loadingSubscription = this.phoneService.get(super.userId, this.phone.phoneId)
    //     .pipe(
    //       delay(1000)
    //     ).subscribe(phone => {
    //       this.phoneVerifyForm.patchValue(phone);
    //     });
    // }));

    this.subscriptions.push(this.phoneVerifyForm.get('verificationCode').valueChanges
      .pipe(
        debounceTime(100)
      )
      .subscribe(v => {
        console.log("New verificationCode value is " + v);
      }));
    console.log(this.phoneVerifyForm);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  verifyInit(): void {
    //this.phoneService.sendVerificationCode(super.userId, this.phone.phoneId);
  }

  verifyAttempt(): void {
    //this.phoneService.submitVerificationCode(super.userId, this.phone.phoneId, this.code);
    // document.location.reload();
  }

}
