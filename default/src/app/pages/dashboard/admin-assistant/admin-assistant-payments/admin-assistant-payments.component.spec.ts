import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssistantPaymentsComponent } from './admin-assistant-payments.component';

describe('AdminAssistantPaymentsComponent', () => {
  let component: AdminAssistantPaymentsComponent;
  let fixture: ComponentFixture<AdminAssistantPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssistantPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssistantPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
