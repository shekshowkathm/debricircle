import { Component } from '@angular/core';
import { AddtocartService } from '../../service/addtocart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressserviceService } from 'src/app/profile/service/addressservice.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAddressComponent } from '../change-address/change-address.component';
import { ProductService } from '../../service/product.service';
declare var Razorpay: any;
//payment
interface IRazorpayConfig {
  key_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string |null;
    email: string | null;
    contact: string | null;
  };
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  panelOpenState = false;
  cartItems: any[] = []; // Declare an array to store cart items
  totalPrice: number=0;
  totalItems: number = 0;
  userAddress:any;
  recentAddress: any[] = [];
  indexValue!:number;
  userAddressName:string=""
  userAddressPincode:string=""
  userAddressLocality:string=""
  userAddressAddress:string=""
  userAddressState:string=""
  phonenumber: string = '';

  constructor(private addToCartService:AddtocartService,private snackBar:MatSnackBar,private addressService:AddressserviceService,private dialog: MatDialog, private productsService: ProductService,){
  
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
      this.phonenumber = response[0]?.mobileNumber;
      this.cartItems = response.reverse();
      this.totalItems=this.cartItems.length
      
      // Calculate the sum of productPrice values
      const totalPrice = this.cartItems.reduce((total, item) => total + parseFloat(item.productPrice), 0);     
      this.totalPrice = +totalPrice.toFixed(2); // Store the total price with 2 decimal places     

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

//payment
createRazorpayOrder() {
 
  const orderRequest = {
   
    customerName: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    phoneNumber: this.phonenumber,
    amount:this.totalPrice // Convert amount to paise if using INR
  };

  this.productsService.createOrder(orderRequest).subscribe(
    (response) => {
      const razorpayOptions: IRazorpayConfig = {
        key_id: response.secretKey,
        amount: response.amount,
        currency: 'INR', // Change to your desired currency
        name: 'Your Company Name',
        description: 'Payment for Your Product/Service',
        order_id: response.razorpayOrderId,
        handler: (response: any) => {
          console.log('Payment success:', response);
          // Handle payment success here
        },
        prefill: {
          name: orderRequest.customerName,
          email: orderRequest.email,
          contact: orderRequest.phoneNumber
        }
      };

      const rzp = new Razorpay(razorpayOptions);
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response);
        // Handle payment failure here
      });
      rzp.open();
    },
    (error) => {
      console.error('Error creating Razorpay order:', error);
      // Handle error
    }
  );
}
}
