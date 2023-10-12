import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userName: string | null = null;
  constructor(private dialog: MatDialog, private router: Router) {
    this.userName = localStorage.getItem('name');
  }

  // LOGOUT METHOD
  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Perform logout action here
        localStorage.clear();
        localStorage.removeItem('rzp_device_id');
        this.router.navigateByUrl('/home/login');

       
        // Add your logout function here
      } else {
        // User canceled the logout
        
      }
    });
  }

  sellMaterials() {
    const localStorageEmpty = Object.keys(localStorage).length === 0;
    if (localStorageEmpty) {
      this.showRegisterAlert();
    } else {
      this.router.navigateByUrl('/sellmaterials');
    }
  }

  disposeWaste() {
    const localStorageEmpty = Object.keys(localStorage).length === 0;
    if (localStorageEmpty) {
      this.showRegisterAlert();
    } else {
      this.router.navigateByUrl('/disposewaste');
    }
  }

  waste() {
    const localStorageEmpty = Object.keys(localStorage).length === 0;
    if (localStorageEmpty) {
      this.showRegisterAlert();
    } else {
      this.router.navigateByUrl('/waste-management');
    }
  }

  addtocart() {
    const localStorageEmpty = Object.keys(localStorage).length === 0;
    if (localStorageEmpty) {
      this.showRegisterAlert();
    } else {
      this.router.navigateByUrl('/addtocart');
    }
  }

  profile() {
    const localStorageEmpty = Object.keys(localStorage).length === 0;
    if (localStorageEmpty) {
      this.showRegisterAlert();
    } else {
      this.router.navigateByUrl('/profile/personal');
    }
  }

  private showRegisterAlert() {
    Swal.fire({
      title: 'You need to register',
      showCancelButton: true,
      confirmButtonText: 'Register',
      cancelButtonText: 'Cancel',
      showClass: {
        popup: 'swal2-noanimation',
        backdrop: 'swal2-noanimation',
      },
      hideClass: {
        popup: '',
        backdrop: '',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/registers');
        // Redirect to login page or show the login page here
        // For example, you can use Angular Router to navigate to the login page
        // this.router.navigate(['/login']); // Import Router and uncomment this line if you have a login route
      }
    });
  }
}
