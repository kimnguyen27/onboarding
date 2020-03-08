import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent implements OnInit {

  @Input() delete_user_modal_title;
  @Input() delete_user_modal_content;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
