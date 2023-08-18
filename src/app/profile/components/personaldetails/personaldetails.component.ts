import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { LogoutDialogComponent } from 'src/app/products/components/logout-dialog/logout-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personaldetails',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.scss']
})
export class PersonaldetailsComponent {
  panelOpenState = false;
  userName: string | null = null;
  public listItem="personalinfo"
  constructor(private dialog: MatDialog,private router:Router) {
    this.userName = localStorage.getItem('name');
  }
  // LOGOUT METHOD
  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Perform logout action here
        this.router.navigateByUrl('/home/login');
        console.log('Performing logout...');
        localStorage.clear();
        // Add your logout function here
      } else {
        // User canceled the logout
        console.log('Logout canceled.');
      }
    });
  }

  confirmLogout() {
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

  personalInfo(){
    this.listItem="personalinfo"
  }
  manageAddress(){
    this.listItem="manageaddress"
  }
  userCredentials(){
    this.listItem="usercredentials"

  }
  myOrder(){
    this.listItem="myorders"
  }
}
