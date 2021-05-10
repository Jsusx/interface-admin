import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteAssignComponent } from './quote-assign.component';

describe('QuotesComponent', () => {
  let component: QuoteAssignComponent;
  let fixture: ComponentFixture<QuoteAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
