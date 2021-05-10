import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssistantsComponent } from './admin-assistants.component';

describe('AdminAssistantComponent', () => {
  let component: AdminAssistantsComponent;
  let fixture: ComponentFixture<AdminAssistantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssistantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssistantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
