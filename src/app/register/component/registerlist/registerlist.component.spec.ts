import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterlistComponent } from './registerlist.component';

describe('RegisterlistComponent', () => {
  let component: RegisterlistComponent;
  let fixture: ComponentFixture<RegisterlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterlistComponent]
    });
    fixture = TestBed.createComponent(RegisterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
