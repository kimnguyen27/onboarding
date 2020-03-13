import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../_model/user.model";
import {UserService} from "../../_service/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserCreateComponent} from "../user-create/user-create.component";
import {UserDeleteComponent} from "../user-delete/user-delete.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserModel[] = [];

  constructor(private userService: UserService,
              public modalService: NgbModal,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.findAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  openCreateModal() {
    const modalRef = this.modalService.open(UserCreateComponent);

    modalRef.componentInstance.users = this.users;
  }

  openDeleteModal(user: UserModel) {
    const modalRef = this.modalService.open(UserDeleteComponent);

    modalRef.componentInstance.delete_user_modal_content = `Are you sure you want to delete user "${user.username}"?`;
    modalRef.componentInstance.fromParentList = user;
    modalRef.componentInstance.activatedRoute = this.activatedRoute;
  }
}
