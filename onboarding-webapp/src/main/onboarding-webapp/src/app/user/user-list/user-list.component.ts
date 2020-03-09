import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../model/user.model";
import {UserService} from "../../service/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDeleteModalComponent} from "../user-delete-modal/user-delete-modal.component";
import {UserCreateComponent} from "../user-create/user-create.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserModel[] = [];

  constructor(private userService: UserService,
              public modalService: NgbModal) {
  }

  ngOnInit() {
    this.userService.findAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  openCreateModal() {
    this.modalService.open(UserCreateComponent);
  }

  openDeleteModal(user: UserModel) {
    const modalRef = this.modalService.open(UserDeleteModalComponent);

    modalRef.componentInstance.delete_user_modal_content = `Are you sure you want to delete user "${user.username}"?`;

    modalRef.componentInstance.fromParentList = user;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }
}
