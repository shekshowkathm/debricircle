import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  public adminDashboard="";

  constructor(private dialog: MatDialog,private router:Router,private adminService:AdminService){
    this.adminService.currentLocation$.subscribe((location:any)=>{
      this.adminDashboard=location
    })
  }

  home(){
    this.adminDashboard="home"
  }

  registerList(){
    this.adminDashboard="registerlist"
  }
  productList(){
    this.adminDashboard="productlist"
  }
  nonSegregated(){
    this.adminDashboard="nonsegregated"
  }

  segregated(){
    this.adminDashboard="segregated"
  }
  wastePlan(){
    this.adminDashboard="waste"
  }

  logout(){
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear localStorage
        localStorage.clear();

        // Navigate to the login page
        this.router.navigate(['/home/login']);
      }
    });
  }
}
