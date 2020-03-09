import {Component, OnInit} from '@angular/core';
import {PhoneModel} from "../../model/phone.model";
import {PhoneService} from "../../service/phone.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit {

  phones: PhoneModel[];

  constructor(private activatedRoute: ActivatedRoute,
              private phoneService: PhoneService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.phoneService.findAllPhones(params['userId']).subscribe(phones => {
        this.phones = phones;
      });
    });
  }

}
