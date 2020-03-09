import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneDeleteComponent } from './phone-delete.component';

describe('PhoneDeleteComponent', () => {
  let component: PhoneDeleteComponent;
  let fixture: ComponentFixture<PhoneDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
