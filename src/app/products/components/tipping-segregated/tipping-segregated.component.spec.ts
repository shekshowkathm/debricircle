import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TippingSegregatedComponent } from './tipping-segregated.component';

describe('TippingSegregatedComponent', () => {
  let component: TippingSegregatedComponent;
  let fixture: ComponentFixture<TippingSegregatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TippingSegregatedComponent]
    });
    fixture = TestBed.createComponent(TippingSegregatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
