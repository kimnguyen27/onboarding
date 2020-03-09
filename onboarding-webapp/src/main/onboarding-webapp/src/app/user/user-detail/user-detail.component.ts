import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {UserModel} from "../../model/user.model";
import {PhoneModel} from "../../model/phone.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {UserDeleteModalComponent} from "../user-delete-modal/user-delete-modal.component";

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
    const modalRef = this.modalService.open(UserDeleteModalComponent);

    modalRef.componentInstance.delete_user_modal_title = "Confirm delete user";
    modalRef.componentInstance
      .delete_user_modal_content = `Are you sure you want to delete user "${this.user.username}"?`;

    modalRef.componentInstance.fromParentList = this.user;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }
}
