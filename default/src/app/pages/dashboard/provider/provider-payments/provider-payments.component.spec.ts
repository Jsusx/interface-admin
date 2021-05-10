import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPaymentsComponent } from './provider-payments.component';

describe('ProviderPaymentsComponent', () => {
  let component: ProviderPaymentsComponent;
  let fixture: ComponentFixture<ProviderPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
