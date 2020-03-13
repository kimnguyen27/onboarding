import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../_service/user.service";
import {UserModel} from "../../_model/user.model";
import {PhoneModel} from "../../_model/phone.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {UserDeleteComponent} from "../user-delete/user-delete.component";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: UserModel;
  phones: PhoneModel[];

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              public modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userService.get(params['userId']).subscribe(data => {
        this.user = data;
        this.phones = this.user.phones;
      });
    });
  }

  openEditModal() {
    const modalRef = this.modalService.open(UserEditComponent);

    modalRef.componentInstance.activatedRoute = this.activatedRoute;
    // modalRef.result.then((result) => {
    //   console.log(result);
    // });
  }

  openDeleteModal() {
    const modalRef = this.modalService.open(UserDeleteComponent);

    modalRef.componentInstance
      .delete_user_modal_content = `Are you sure you want to delete user "${this.user.username}"?`;
    modalRef.componentInstance.activatedRoute = this.activatedRoute;
    modalRef.componentInstance.fromParentList = this.user;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }
}
