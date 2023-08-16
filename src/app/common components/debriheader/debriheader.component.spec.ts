import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebriheaderComponent } from './debriheader.component';

describe('DebriheaderComponent', () => {
  let component: DebriheaderComponent;
  let fixture: ComponentFixture<DebriheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebriheaderComponent]
    });
    fixture = TestBed.createComponent(DebriheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
