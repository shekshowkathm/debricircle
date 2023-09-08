import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss'],
})
export class LogoutDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public onConfirm(): void {
    this.dialogRef.close(true); // Close the dialog and pass 'true' to indicate user confirmed.
  }

  public onCancel(): void {
    this.dialogRef.close(false); // Close the dialog and pass 'false' to indicate user canceled.
  }
}
