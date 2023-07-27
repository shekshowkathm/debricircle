import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposewasteComponent } from './disposewaste.component';

describe('DisposewasteComponent', () => {
  let component: DisposewasteComponent;
  let fixture: ComponentFixture<DisposewasteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisposewasteComponent]
    });
    fixture = TestBed.createComponent(DisposewasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
