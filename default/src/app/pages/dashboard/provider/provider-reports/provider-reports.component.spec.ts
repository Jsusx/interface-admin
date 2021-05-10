import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderReportsComponent } from './provider-reports.component';

describe('ProviderReportsComponent', () => {
  let component: ProviderReportsComponent;
  let fixture: ComponentFixture<ProviderReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
