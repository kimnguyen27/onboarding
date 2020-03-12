import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PhoneService} from "../../service/phone.service";

@Component({
  selector: 'app-phone-delete',
  templateUrl: './phone-delete.component.html',
  styleUrls: ['./phone-delete.component.css']
})
export class PhoneDeleteComponent implements OnInit, OnDestroy {

  @Input() delete_phone_modal_content;
  @Input() fromParentList;
  @Input() userId;

  constructor(public activeModal: NgbActiveModal,
              private phoneService: PhoneService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  deletePhone(): void {
    this.phoneService.delete(this.userId, this.fromParentList.phoneId).subscribe();
    document.location.reload();
  }
}
