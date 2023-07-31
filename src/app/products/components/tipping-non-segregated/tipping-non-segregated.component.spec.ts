import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TippingNonSegregatedComponent } from './tipping-non-segregated.component';

describe('TippingNonSegregatedComponent', () => {
  let component: TippingNonSegregatedComponent;
  let fixture: ComponentFixture<TippingNonSegregatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TippingNonSegregatedComponent]
    });
    fixture = TestBed.createComponent(TippingNonSegregatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
