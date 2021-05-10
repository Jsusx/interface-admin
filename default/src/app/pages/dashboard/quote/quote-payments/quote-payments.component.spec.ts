import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePaymentsComponent } from './quote-payments.component';

describe('QuotePaymentsComponent', () => {
  let component: QuotePaymentsComponent;
  let fixture: ComponentFixture<QuotePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotePaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
