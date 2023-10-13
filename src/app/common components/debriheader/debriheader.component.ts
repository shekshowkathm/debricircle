import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutDialogComponent } from 'src/app/products/components/logout-dialog/logout-dialog.component';
import { AddtocartService } from 'src/app/products/service/addtocart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-debriheader',
  templateUrl: './debriheader.component.html',
  styleUrls: ['./debriheader.component.scss'],
})
export class DebriheaderComponent {
  userName: string | null = null;
  badgeCount = 0;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private addToCartService: AddtocartService
  ) {
    this.userName = localStorage.getItem('name');
  }

  ngOnInit(): void {
    this.getBadgeCount();
  }

  getBadgeCount() {
    const userIdUser = localStorage.getItem('userId');
    this.addToCartService.getCartDetailsByUserID(userIdUser).subscribe(
      (response: any) => {
        this.badgeCount = response.length;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  // LOGOUT METHOD
  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        localStorage.clear();
        localStorage.removeItem('rzp_device_id');
        // Perform logout action here
        this.router.navigateByUrl('/home/login');
        // Add your logout function here
      } else {
        // User canceled the logout
        console.log('Logout canceled.');
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

  isAdminRole(): boolean {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
  }

  admin() {
    const localStorageEmpty = Object.keys(localStorage).length === 0;
    if (localStorageEmpty) {
      this.showRegisterAlert();
    } else {
      this.router.navigateByUrl('/admin/admin');
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
  homePage() {
    this.router.navigateByUrl('');
  }

  aboutus() {
    this.router.navigateByUrl('/aboutus');
  }
  consultationservice() {
    this.router.navigateByUrl('/consultaionservice');
  }
}
