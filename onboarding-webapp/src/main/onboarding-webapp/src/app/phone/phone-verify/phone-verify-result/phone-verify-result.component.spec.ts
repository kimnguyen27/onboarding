import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneVerifyResultComponent } from './phone-verify-result.component';

describe('PhoneVerifyResultComponent', () => {
  let component: PhoneVerifyResultComponent;
  let fixture: ComponentFixture<PhoneVerifyResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneVerifyResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneVerifyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
