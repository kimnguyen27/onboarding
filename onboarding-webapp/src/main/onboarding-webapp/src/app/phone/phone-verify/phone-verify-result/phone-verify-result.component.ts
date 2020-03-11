import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-phone-verify-result',
  templateUrl: './phone-verify-result.component.html',
  styleUrls: ['./phone-verify-result.component.css']
})
export class PhoneVerifyResultComponent implements OnInit, OnDestroy {

  @Input() phone;
  public verified: boolean;

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.verified = this.phone.verified;
  }

  ngOnDestroy() {
    if (this.verified) {
      document.location.reload();
    }
  }
}
