import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {debounceTime, delay} from "rxjs/internal/operators";
import {PhoneService} from "../../_service/phone.service";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.css']
})
export class PhoneDetailComponent implements OnInit, OnDestroy {

  phoneEditForm: FormGroup = this.createFormGroup();
  subscriptions: Subscription[] = [];
  loadingSubscription: Subscription = Subscription.EMPTY;

  @Input() activatedRoute;
  @Input() phone;
  private userId: string;
  private phoneId: string;
  private phoneNumber: string;
  public verified: boolean;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private phoneService: PhoneService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.phoneId = this.phone.phoneId;
      this.phoneNumber = this.phone.phoneNumber;
      this.verified = this.phone.verified;
      this.loadingSubscription = this.phoneService.get(this.userId, this.phoneId)
        .pipe(
          delay(1000)
        ).subscribe(phone => {
          this.phoneEditForm.patchValue(phone);
        });
    }));

    this.subscriptions.push(this.phoneEditForm.get('phoneNumber').valueChanges
      .pipe(
        debounceTime(100)
      )
      .subscribe(v => {
        console.log("New phoneNumber value is " + v);
      }));

    console.log(this.phoneEditForm);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onSubmit() {
    if (this.phoneEditForm.valid) {
      this.savePhone();
      this.activeModal.close('Close submit');
    }
  }

  savePhone(): void {
    const valueToSave = {...this.phoneEditForm.value, phoneId: this.phoneId};

    this.phoneService.update(this.userId, valueToSave).subscribe(phone => {
      this.phoneEditForm.patchValue(phone);
    });
    this.phoneService.clearVerification(this.userId, this.phoneId); // Back end redundancy to revoke verification upon update
    document.location.reload();
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'phoneNumber': [
        '', [
          Validators.required,
          Validators.pattern(new RegExp('^\\+[1-9]\\d{1,14}$')) // Validating for e.164 phone format
        ]
      ],
      'verified': 'false'
    });
  }
}
