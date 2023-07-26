import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuymaterialsComponent } from './buymaterials.component';

describe('BuymaterialsComponent', () => {
  let component: BuymaterialsComponent;
  let fixture: ComponentFixture<BuymaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuymaterialsComponent]
    });
    fixture = TestBed.createComponent(BuymaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
