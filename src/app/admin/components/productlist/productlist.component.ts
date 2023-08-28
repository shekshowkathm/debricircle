import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Clipboard } from '@angular/cdk/clipboard';



import { AdminService } from '../../service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
})
export class ProductlistComponent {
  productList: any;
  productListTotal: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'userId',
    'materialtype',
    'category',
    'selectedDate',
    'quality',
    'location',
    'mobileNumber',
    'productPrice',
    'image',
    'action',
  ];

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private clipboard: Clipboard,

  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.adminService.getAllProductsData().subscribe(
      (response: any) => {
        console.log(response);
        this.productList = response;
        this.productListTotal = response.length;
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource.data);
      },
      (error) => {
        console.error('Not data get', error);
      }
    );
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

  copyImageLink(imageLink: string): void {
    this.clipboard.copy(imageLink);
    let snackBarRef = this.snackBar.open('Image link copied !', '', {
      duration: 2000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
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
    console.log(element.id);
    this.adminService.deleteProducts(element.id).subscribe(()=>{
      console.log('Item deleted successfully.');
      this.getAllProducts();
    },
    (error) => {
      console.error('Error deleting item:', error);
    }
    );
  }
}
