import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipping-non-segregated',
  templateUrl: './tipping-non-segregated.component.html',
  styleUrls: ['./tipping-non-segregated.component.scss']
})
export class TippingNonSegregatedComponent {

  constructor(
    public dialogRef: MatDialogRef<TippingNonSegregatedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public onCancel(): void {
    this.dialogRef.close(); // Close the dialog
  }
}
