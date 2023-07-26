import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { RegisterService } from '../../service/register.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  updateForm!: FormGroup; // Declare the updateForm as a FormGroup

  getById:any
  constructor(private registerService:RegisterService,
    private act:ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder
    ){
      this.updateForm = this.formBuilder.group({
        user: [''], // Initialize the user FormControl with an empty string
        age: [''],  // Initialize the age FormControl with an empty string
      });
    }

    ngOnInit() {
      const id=this.act.snapshot.paramMap.get('id');
      console.log(id);

      this.registerService.getStudentId(id).subscribe((res:any)=>{

        this.getById=res;
        console.log(this.getById);
        // Set the values of form controls using setValue or patchValue
      this.updateForm.patchValue({
        user: this.getById.user,
        age: this.getById.age
      });
      })
    }

  onEdit(){
    const id=this.act.snapshot.paramMap.get('id');
    this.registerService.updateStudent(this.updateForm.value,id);
    this.router.navigate(['/register/registerlist'])
  }

}
