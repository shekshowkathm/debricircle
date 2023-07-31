import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dialog: MatDialog,private router:Router) { }

  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Perform logout action here
        this.router.navigateByUrl('');
        console.log('Performing logout...');
        localStorage.clear();
        // Add your logout function here
      } else {
        // User canceled the logout
        console.log('Logout canceled.');
      }
    });
  }
}
