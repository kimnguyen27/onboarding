import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit, OnDestroy {

  @Input() delete_user_modal_content;
  @Input() fromParentList;

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService) {
  }

  ngOnInit(): void {
    console.log(this.fromParentList);
  }

  ngOnDestroy() {
    document.location.reload();
  }

  deleteUser(): void {
    this.userService.delete(this.fromParentList.userId);
  }
}
