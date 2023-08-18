import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageaddressComponent } from './manageaddress.component';

describe('ManageaddressComponent', () => {
  let component: ManageaddressComponent;
  let fixture: ComponentFixture<ManageaddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageaddressComponent]
    });
    fixture = TestBed.createComponent(ManageaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
