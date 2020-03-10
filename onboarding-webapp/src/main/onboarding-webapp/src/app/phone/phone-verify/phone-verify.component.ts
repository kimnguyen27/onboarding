import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PhoneModel } from "../../model/phone.model";

@Component({
  selector: 'app-phone-verify',
  templateUrl: './phone-verify.component.html',
  styleUrls: ['./phone-verify.component.css']
})
export class PhoneVerifyComponent implements OnInit, OnDestroy {

  //@Input() activatedRoute;
  @Input() phoneFromList;
  @Input() userIdFromList;
  @Input() verifiedFromList;

  public phone: PhoneModel;
  public userId: string;
  public verified: boolean;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.phone = this.phoneFromList;
    this.userId = this.userIdFromList;
    this.verified = this.verifiedFromList;
  }

  ngOnDestroy() {
  }
}
