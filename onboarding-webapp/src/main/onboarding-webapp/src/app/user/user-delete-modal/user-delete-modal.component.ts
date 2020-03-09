import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent implements OnInit {

  @Input() delete_user_modal_title;
  @Input() delete_user_modal_content;
  @Input() fromParentList;

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService) {
  }

  ngOnInit(): void {
    console.log(this.fromParentList);
  }

  deleteUser(): void {
    this.userService.delete(this.fromParentList.userId);
  }

}
