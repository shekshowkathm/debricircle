import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class RegisterService {
  constructor(private angularFireStore: AngularFirestore) {}

  getStudentId(id: any) {
    return this.angularFireStore
      .collection('debricircle-collection')
      .doc(id)
      .valueChanges();
  }
  getStudentList() {
    return this.angularFireStore
      .collection('debricircle-collection')
      .snapshotChanges();
  }
  createStudent(loginForm: any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireStore
        .collection('debricircle-collection')
        .add(loginForm)
        .then(
          (response: any) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }
  deleteStudent(loginForm: any) {
    return this.angularFireStore
      .collection('debricircle-collection')
      .doc(loginForm.id)
      .delete();
  }
  updateStudent(loginForm: any, id: any) {
    return this.angularFireStore.collection('debricircle-collection').doc(id).update({
      user:loginForm.user,
      age:loginForm.age
    });
  }
}
