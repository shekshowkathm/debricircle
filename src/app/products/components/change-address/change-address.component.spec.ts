import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAddressComponent } from './change-address.component';

describe('ChangeAddressComponent', () => {
  let component: ChangeAddressComponent;
  let fixture: ComponentFixture<ChangeAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeAddressComponent]
    });
    fixture = TestBed.createComponent(ChangeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
