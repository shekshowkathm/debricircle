import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteplanComponent } from './wasteplan.component';

describe('WasteplanComponent', () => {
  let component: WasteplanComponent;
  let fixture: ComponentFixture<WasteplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WasteplanComponent]
    });
    fixture = TestBed.createComponent(WasteplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
