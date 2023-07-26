import { Component } from '@angular/core';
import { RegisterService } from '../../service/register.service';


@Component({
  selector: 'app-registerlist',
  templateUrl: './registerlist.component.html',
  styleUrls: ['./registerlist.component.scss'],
})
export class RegisterlistComponent {

  getAllData: any;

  constructor(private registerService: RegisterService) {}
  ngOnInit() {
    this.getData();
  }
  deleteStudent(item: any): void {
    this.registerService.deleteStudent(item);
    console.log(item);
    this.registerService
      .deleteStudent(item)
      .then(() => {
        console.log('Document successfully deleted! ' + item.user);
        this.getData();
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }
  getData() {
    this.registerService.getStudentList().subscribe((data: any) => {
      this.getAllData = data.map((item: any) => {
        const id = item.payload.doc.id;
        const docData = item.payload.doc.data();
        return { id, ...docData };
      });``
      console.log(this.getAllData);
    });
  }
  getById(user:any){
    this.registerService.getStudentId(user)
    .subscribe((res:any)=>{
      console.log(res);
    })
  }
}
