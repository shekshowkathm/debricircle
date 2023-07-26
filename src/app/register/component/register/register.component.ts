import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  loginForm = new FormGroup({
    user: new FormControl(''),
    age: new FormControl(''),
  });
  getAllData: any;
  constructor(
    private firestore: Firestore,
    private registerService: RegisterService
  ) {}

  ngOnInit() {}
  loginUser() {
    console.log(this.loginForm.value);
    const collectionInstance = collection(this.firestore, 'users');
    console.log('hello');

    addDoc(collectionInstance, this.loginForm.value)
      .then(() => {
        console.log('Data saved sucessfully' + this.loginForm.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getData() {
    this.registerService.getStudentList().subscribe((res: any) => {
      this.getAllData = res;
      console.log(res);
      console.log(this.getAllData);


    });
  }
  onSubmit() {
    this.registerService.createStudent(this.loginForm.value);
    alert('success of posting');
  }
}
