import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellmaterialsComponent } from './sellmaterials.component';

describe('SellmaterialsComponent', () => {
  let component: SellmaterialsComponent;
  let fixture: ComponentFixture<SellmaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellmaterialsComponent]
    });
    fixture = TestBed.createComponent(SellmaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
