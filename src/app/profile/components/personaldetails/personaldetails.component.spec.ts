import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaldetailsComponent } from './personaldetails.component';
import { HeaderComponent } from 'src/app/products/components/header/header.component';

describe('PersonaldetailsComponent', () => {
  let component: PersonaldetailsComponent;
  let fixture: ComponentFixture<PersonaldetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaldetailsComponent,HeaderComponent]
    });
    fixture = TestBed.createComponent(PersonaldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
