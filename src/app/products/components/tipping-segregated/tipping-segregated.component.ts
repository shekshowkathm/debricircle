import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-tipping-segregated',
  templateUrl: './tipping-segregated.component.html',
  styleUrls: ['./tipping-segregated.component.scss']
})
export class TippingSegregatedComponent {


  constructor(
    public dialogRef: MatDialogRef<TippingSegregatedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public onCancel(): void {
    this.dialogRef.close(); // Close the dialog
  }
}

