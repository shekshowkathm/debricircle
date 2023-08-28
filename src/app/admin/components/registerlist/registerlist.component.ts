import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registerlist',
  templateUrl: './registerlist.component.html',
  styleUrls: ['./registerlist.component.scss']
})
export class RegisterlistComponent {

  registerList:any;
  registerListTotal:any;
  displayedColumns: string[] = [ 'userId', 'name','email', 'businessName','location','mobileNumber','action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private router: Router,private snackBar:MatSnackBar,private adminService:AdminService){}

  ngOnInit() {
    this.getAllRegisterList();
  }

  getAllRegisterList(){
    this.adminService.getAllData().subscribe((response:any)=>{
      console.log(response);
      this.registerList=response

      this.dataSource.data = response;
      this.registerListTotal=response.length;
      console.log(this.registerListTotal);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    },
    (error) => {
      console.error('Not data get', error);
    }
    )
  }

  editData(data:any){

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    // Reset sort to its initial state
    this.dataSource.sort?.sort({ id: '', start: 'asc', disableClear: false });
  }

  confirmDelete(data:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this entry!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete function here
        this.performDelete(data);
      }
    });
  }
  performDelete(element: any): void {
    console.log(element);
    console.log(element.id);
    this.adminService.deleteRegister(element.id).subscribe(()=>{
      console.log('Item deleted successfully.');
      this.getAllRegisterList();
    },
    (error) => {
      console.error('Error deleting item:', error);
    }
    );

  }

}
