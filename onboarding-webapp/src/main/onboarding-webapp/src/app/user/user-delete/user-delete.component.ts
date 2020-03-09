import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit, OnDestroy {

  @Input() delete_user_modal_content;
  @Input() fromParentList;
  @Input() activatedRoute;
  private userId: string;

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.userId = params['userId'];
    });
    console.log("UserId in path: "+ this.userId);
    console.log(this.fromParentList);
  }

  ngOnDestroy() {
  }

  deleteUser(): void {
    this.userService.delete(this.fromParentList.userId).subscribe();
    this.router.navigateByUrl('/users').then(() => {});
    if (this.userId == undefined) {
      document.location.reload(); // Reloads when deleting from user list
    }
  }
}
