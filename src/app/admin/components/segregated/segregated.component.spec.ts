import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegregatedComponent } from './segregated.component';

describe('SegregatedComponent', () => {
  let component: SegregatedComponent;
  let fixture: ComponentFixture<SegregatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SegregatedComponent]
    });
    fixture = TestBed.createComponent(SegregatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
