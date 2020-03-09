import {Component, OnInit} from '@angular/core';
import {PhoneModel} from "../../model/phone.model";
import {PhoneService} from "../../service/phone.service";
import {ActivatedRoute} from "@angular/router";
import {PhoneDetailComponent} from "../phone-detail/phone-detail.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit {

  phones: PhoneModel[];

  constructor(private activatedRoute: ActivatedRoute,
              private phoneService: PhoneService,
              public modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.phoneService.findAllPhones(params['userId']).subscribe(phones => {
        this.phones = phones;
      });
    });
  }

  openPhoneModal(phone: PhoneModel) {
    const modalRef = this.modalService.open(PhoneDetailComponent);

    modalRef.componentInstance.activatedRoute = this.activatedRoute;
    modalRef.componentInstance.phone = phone;
    // modalRef.result.then((result) => {
    //   console.log(result);
    // });
  }
}
