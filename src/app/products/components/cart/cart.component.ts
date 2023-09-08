import { Component } from '@angular/core';
import { AddtocartService } from '../../service/addtocart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressserviceService } from 'src/app/profile/service/addressservice.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAddressComponent } from '../change-address/change-address.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  panelOpenState = false;
  cartItems: any[] = []; // Declare an array to store cart items
  totalPrice: any;
  totalItems: number = 0;
  userAddress:any;
  recentAddress: any[] = [];
  indexValue!:number;
  userAddressName:string=""
  userAddressPincode:string=""
  userAddressLocality:string=""
  userAddressAddress:string=""
  userAddressState:string=""

  constructor(private addToCartService:AddtocartService,private snackBar:MatSnackBar,private addressService:AddressserviceService,private dialog: MatDialog){
    // this.addToCartService.currentAddress$.subscribe((value:number)=>{
    //   this.indexValue=value
    //   console.log(this.indexValue);
    // })
    const storedIndex = localStorage.getItem("index");
    if (storedIndex !== null){
      const indexAsNumber = parseInt(storedIndex, 10);
      this.indexValue=indexAsNumber
    }
  }

  ngOnInit(): void {
    this.getCarts();
    this.getUserAddress();
  }


  getCarts(){
    const userIdUser = localStorage.getItem('userId');
    this.addToCartService.getCartDetailsByUserID(userIdUser).subscribe((response:any)=>{
      console.log(response);
      this.cartItems = response.reverse();
      console.log(this.cartItems);
      console.log(this.cartItems.length);
      this.totalItems=this.cartItems.length

      // Calculate the sum of productPrice values
      const totalPrice = this.cartItems.reduce((total, item) => total + parseFloat(item.productPrice), 0);
      this.totalPrice = totalPrice.toFixed(2); // Store the total price with 2 decimal places
      console.log(this.totalPrice);

    },
    (error) => {
      console.error('Error fetching product details:', error);
    }
    )
  }


  removeFromCart(userId:string,productId:string){
    console.log(userId);
    console.log(productId);
    this.addToCartService.deleteCartItem(userId,productId).subscribe(
      () => {
        console.log("cart removed");
        this.getCarts();
        let snackBarRef=this.snackBar.open("Product removed from your cart !", "Dismiss",{duration:2000,horizontalPosition: 'end',verticalPosition: 'bottom',});


      },
      error => {
        // Handle error if needed
        console.error('Error deleting cart item:', error);
      }
    );

  }

  decrementProductPiece(item:any){
    console.log(item);
    this.addToCartService.decrementPieceOfProduct(item).subscribe((response:any)=>{
      console.log(response);
      this.getCarts();
      let snackBarRef=this.snackBar.open("Piece of quantity decremented !", "Undo",{duration:2000,horizontalPosition: 'end',verticalPosition: 'bottom',});
      snackBarRef.onAction().subscribe(()=>{
        console.log("the undo action is triggered");
        this.incrementProductPiece(response);

      });
      snackBarRef.afterDismissed().subscribe(()=>{
        console.log("the snack bar dismissed");
      })

    },
    (error) => {
      console.error('Not incremented', error);
    }
    )

  }

  incrementProductPiece(item:any){
    console.log(item);
    this.addToCartService.incrementPieceOfProduct(item).subscribe((response:any)=>{
      console.log(response);
      this.getCarts();
      let snackBarRef=this.snackBar.open("Piece of quantity incremented !", "Undo",{duration:2000,horizontalPosition: 'end',verticalPosition: 'bottom',});
      snackBarRef.onAction().subscribe(()=>{
        console.log("the undo action is triggered");
        this.decrementProductPiece(response);

      });
      snackBarRef.afterDismissed().subscribe(()=>{
        console.log("the snack bar dismissed");
      })

    },
    (error) => {
      console.error('Not incremented', error);
    }
    )
  }

  getUserAddress(){
    const userIdFromLocalStorage = localStorage.getItem("userId");
    this.addressService.getAddressByUserID(userIdFromLocalStorage).subscribe((response:any)=>{
      console.log(response);
      this.userAddress=response.reverse();
      console.log(this.userAddress);
      console.log(this.indexValue);

      this.recentAddress=this.userAddress[localStorage.getItem("index")||""]
      this.userAddressName=this.userAddress[localStorage.getItem("index")||""].name
      this.userAddressPincode=this.userAddress[localStorage.getItem("index")||""].pincode
      this.userAddressLocality=this.userAddress[localStorage.getItem("index")||""].locality
      this.userAddressAddress=this.userAddress[localStorage.getItem("index")||""].address
      this.userAddressState=this.userAddress[localStorage.getItem("index")||""].state

      console.log(this.recentAddress);


    },
    (error) => {
      console.error('Error retrieving user data:', error);
      // Handle error
    }
    )
  }

  openChangeAddressDialog(): void {
    const dialogRef = this.dialog.open(ChangeAddressComponent, {
      width: '450px', // Adjust the width as needed
      height:'auto',
      data: this.userAddress // Pass the array to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'closedWithSuccess') {
        this.callMethodInYourComponent();
      }
    });
  }

  callMethodInYourComponent(): void {
    // This method will be triggered when the dialog is closed with success
    this.getUserAddress();
    console.log('Dialog closed with success. Calling method in your component.');
  }


}
