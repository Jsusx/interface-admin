import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAssignComponent } from './provider-assign.component';

describe('ProvidersComponent', () => {
  let component: ProviderAssignComponent;
  let fixture: ComponentFixture<ProviderAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
