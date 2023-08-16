import { Component } from '@angular/core';
import { AddtocartService } from '../../service/addtocart.service';
import { MatSnackBar } from '@angular/material/snack-bar';



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


  constructor(private addToCartService:AddtocartService,private snackBar:MatSnackBar){}

  ngOnInit(): void {
    this.getCarts();
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


}
