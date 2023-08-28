import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonSegregatedComponent } from './non-segregated.component';

describe('NonSegregatedComponent', () => {
  let component: NonSegregatedComponent;
  let fixture: ComponentFixture<NonSegregatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonSegregatedComponent]
    });
    fixture = TestBed.createComponent(NonSegregatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
