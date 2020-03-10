import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneVerifyContentComponent } from './phone-verify-content.component';

describe('PhoneVerifyContentComponent', () => {
  let component: PhoneVerifyContentComponent;
  let fixture: ComponentFixture<PhoneVerifyContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneVerifyContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneVerifyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
