import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallCenterPaymentsComponent } from './call-center-payments.component';

describe('CallCenterPaymentsComponent', () => {
  let component: CallCenterPaymentsComponent;
  let fixture: ComponentFixture<CallCenterPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallCenterPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallCenterPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
