import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebriregisterComponent } from './debriregister.component';

describe('DebriregisterComponent', () => {
  let component: DebriregisterComponent;
  let fixture: ComponentFixture<DebriregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebriregisterComponent]
    });
    fixture = TestBed.createComponent(DebriregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
