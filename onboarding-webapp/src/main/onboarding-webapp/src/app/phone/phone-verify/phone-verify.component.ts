import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PhoneModel } from "../../model/phone.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PhoneService } from "../../service/phone.service";
import { PhoneVerifyResultComponent } from "./phone-verify-result/phone-verify-result.component";

@Component({
  selector: 'app-phone-verify',
  templateUrl: './phone-verify.component.html',
  styleUrls: ['./phone-verify.component.css']
})
export class PhoneVerifyComponent implements OnInit, OnDestroy {

  @Input() phone;
  @Input() userId;
  @Input() verified;

  protected phoneVerifyForm: FormGroup = this.createFormGroup();
  private code: string;
  private scrubPhone: PhoneModel;

  constructor(public activeModal: NgbActiveModal,
              private activatedRoute: ActivatedRoute,
              private phoneService: PhoneService,
              private formBuilder: FormBuilder,
              public modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.verifyInit();
  }

  ngOnDestroy(): void {
    this.phoneService.get(this.userId, this.phone.phoneId).subscribe( phone => {
      this.scrubPhone = phone;
      if (!this.scrubPhone.verified) {
        this.phoneService.clearVerification(this.userId, this.phone.phoneId).subscribe();
      }
    });
  }

  verifyInit(): void {
    this.phoneService.sendVerificationCode(this.userId, this.phone.phoneId).subscribe();
  }

  verifyAttempt(): void {
    this.code = this.phoneVerifyForm.controls['verificationCode'].value;

    console.log("Submitting code: " + this.code);
    console.log("Verification status before submit: " + this.verified);

    this.phoneService.submitVerificationCode(this.userId, this.phone.phoneId, this.code)
      .subscribe(result => {
        this.verifyResult(result);
      });
  }

  verifyResult(phoneResult: PhoneModel) {
    console.log("Verification status after submit: " + phoneResult.verified);

    const modalRef = this.modalService.open(PhoneVerifyResultComponent);
    modalRef.componentInstance.phone = phoneResult;

    this.activeModal.close();
  }

  protected createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'verificationCode': [
        '', [
          Validators.required,
          Validators.pattern(new RegExp('^[0-9]*$')),
          Validators.minLength(6)
        ]
      ]
    });
  }
}
