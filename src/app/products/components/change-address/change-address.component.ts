import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AddtocartService } from '../../service/addtocart.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})
export class ChangeAddressComponent {
  recentAddress:any;
  public indexValue:number=0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private addcartService:AddtocartService,private dialogRef: MatDialogRef<ChangeAddressComponent>) {
    this.recentAddress=data
    console.log(this.recentAddress);
    this.addcartService.currentAddress$.subscribe((value:number)=>{
      this.indexValue=value
      console.log("Received new value:", value);
    })

  }

  selectAddress(index: number): void {
    console.log(index);
    localStorage.setItem("index", index.toString());

    this.indexValue=index
    console.log(this.indexValue);
    this.addcartService.updateCurrentAddress(index);
    console.log(this.data[index]); // Log the object of the selected index
    this.closeDialogWithSuccess();
  }

  closeDialogWithSuccess(): void {
    // Any actions you want to perform before closing the dialog
    this.dialogRef.close('closedWithSuccess');
  }
}
