import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercredentialsComponent } from './usercredentials.component';

describe('UsercredentialsComponent', () => {
  let component: UsercredentialsComponent;
  let fixture: ComponentFixture<UsercredentialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsercredentialsComponent]
    });
    fixture = TestBed.createComponent(UsercredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
