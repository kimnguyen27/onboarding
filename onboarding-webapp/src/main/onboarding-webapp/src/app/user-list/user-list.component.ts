import {Component, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDeleteModalComponent} from "../user-delete-modal/user-delete-modal.component";

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

  openModal(user: UserModel) {
    const modalRef = this.modalService.open(UserDeleteModalComponent);

    modalRef.componentInstance
      .delete_user_modal_title = "Delete user";
    modalRef.componentInstance
      .delete_user_modal_content = `Are you sure you want to delete user "${user.username}"?`;
    //This section is if you want to have any variable to initialize
    //compConst.componentInstance.weight = undefined;
  }

  deleteUser(user: UserModel) {
    this.userService.delete(user.userId);
    // this.userService.findAllUsers().subscribe( users => {
    //   this.users = users;
    // });
  }
}
