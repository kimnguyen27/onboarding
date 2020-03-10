import {Component, OnInit} from '@angular/core';
import {PhoneModel} from "../../model/phone.model";
import {PhoneService} from "../../service/phone.service";
import {ActivatedRoute} from "@angular/router";
import {PhoneDetailComponent} from "../phone-detail/phone-detail.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PhoneCreateComponent} from "../phone-create/phone-create.component";
import {PhoneDeleteComponent} from "../phone-delete/phone-delete.component";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {PhoneVerifyComponent} from "../phone-verify/phone-verify.component";

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit {

  phones: PhoneModel[];
  private userId: string;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  constructor(private activatedRoute: ActivatedRoute,
              private phoneService: PhoneService,
              public modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.phoneService.findAllPhones(params['userId']).subscribe(phones => {
        this.phones = phones;
        this.userId = params['userId'];
      });
    });
  }

  openCreateModal() {
    const modalRef = this.modalService.open(PhoneCreateComponent);

    modalRef.componentInstance.userId = this.userId;
  }

  openPhoneModal(phone: PhoneModel) {
    const modalRef = this.modalService.open(PhoneDetailComponent);

    modalRef.componentInstance.activatedRoute = this.activatedRoute;
    modalRef.componentInstance.phone = phone;
  }

  openDeleteModal(phone: PhoneModel) {
    const modalRef = this.modalService.open(PhoneDeleteComponent);

    modalRef.componentInstance
      .delete_phone_modal_content = `Are you sure you want to delete phone "${phone.phoneNumber}"?`;

    modalRef.componentInstance.fromParentList = phone;
    modalRef.componentInstance.userId = this.userId;
  }

  openVerifyModal(phone: PhoneModel) {
    const modalRef = this.modalService.open(PhoneVerifyComponent);

    //modalRef.componentInstance.activatedRoute = this.activatedRoute;
    modalRef.componentInstance.fromParentList = phone;
    modalRef.componentInstance.userId = this.userId;
  }
}
