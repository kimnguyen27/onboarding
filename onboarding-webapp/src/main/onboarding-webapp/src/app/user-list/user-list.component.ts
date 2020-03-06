import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserModel[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.findAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(user: UserModel) {
    this.userService.delete(user.userId);
    // this.userService.findAllUsers().subscribe( users => {
    //   this.users = users;
    // });
  }
}
