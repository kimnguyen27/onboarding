import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {PhoneService} from "../../../service/phone.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-phone-verify-content',
  templateUrl: './phone-verify-content.component.html',
  styleUrls: ['./phone-verify-content.component.css']
})
export class PhoneVerifyContentComponent implements OnInit, OnDestroy {

  protected phoneVerifyForm: FormGroup = this.createFormGroup();
  private code: string;
  faCheckCircle = faCheckCircle;

  @Input() userId;
  @Input() phone;
  @Input() verified;

  constructor(private activatedRoute: ActivatedRoute,
              private phoneService: PhoneService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.verifyInit();

    console.log(this.phoneVerifyForm);
  }

  ngOnDestroy() {
  }


  verifyInit(): void {
    this.phoneService.sendVerificationCode(this.userId, this.phone.phoneId).subscribe();
  }

  verifyAttempt(): void {
    this.code = this.phoneVerifyForm.controls['verificationCode'].value;
    console.log("Submitting code: " + this.code);
    this.phoneService.submitVerificationCode(this.userId, this.phone.phoneId, this.code).subscribe();
    // FIXME: Modal closes on reload
    document.location.reload();
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
      ]
      //'verified': 'false'
    });
  }

}
