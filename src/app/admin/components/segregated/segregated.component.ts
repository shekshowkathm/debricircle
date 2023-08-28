import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { PreviewDialogComponent } from '../preview-dialog/preview-dialog.component';

@Component({
  selector: 'app-segregated',
  templateUrl: './segregated.component.html',
  styleUrls: ['./segregated.component.scss']
})
export class SegregatedComponent {
  segregatedList:any;
  segregatedListTotal:any;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [ 'userId', 'location','number', 'address','totalVolume','orderDate','viewdetails','action'];

  constructor(private router: Router,private snackBar:MatSnackBar,private adminService:AdminService,private dialog: MatDialog){}

  ngOnInit() {
    this.getAllSegregatedWaste();
  }

  getAllSegregatedWaste(){
    this.adminService.getAllSegregated().subscribe((response:any)=>{
      console.log(response);
      this.segregatedList=response

      this.dataSource.data = response;
      this.segregatedListTotal=response.reduce((total:any, item:any) => total + parseInt(item.totalVolume), 0);
      console.log(this.segregatedListTotal);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);

    })
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
    this.adminService.deleteSegregated(element.id).subscribe(()=>{
      console.log('Item deleted successfully.');
      this.getAllSegregatedWaste();
    },
    (error) => {
      console.error('Error deleting item:', error);
    }
    );
  }

  openPreviewDialog(data: any) {
    const dialogRef = this.dialog.open(PreviewDialogComponent, {
      width: '500px',
      height:'350px',
      data: data // Pass your object of data here
    });

    dialogRef.afterClosed().subscribe(result => {
      // Optional: You can perform actions after the dialog is closed
    });
  }

}
