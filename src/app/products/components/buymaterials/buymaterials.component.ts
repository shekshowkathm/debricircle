import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HomeService } from 'src/app/home/service/home.service';
import { AddtocartService } from '../../service/addtocart.service';
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
    name: string | null;
    email: string | null;
    contact: string | null;
  };
}

@Component({
  selector: 'app-buymaterials',
  templateUrl: './buymaterials.component.html',
  styleUrls: ['./buymaterials.component.scss'],
})
export class BuymaterialsComponent {
  getAllProducts: any[] = []; // Initialize as an empty array
  showPhoneNumber = false; // Add this variable
  activeCardIndices: number[] = []; // Array to store the indices of active cards
  selectedMaterial!: string; // To store the selected Material type
  selectedCategory!: string; // To store the selected Category
  selectedPrice!: string; // To store the selected Price
  selectedLocation!: string; // To store the selected Location
  selectedQuality!: string; // To store the selected Quality
  filteredProducts: any[] = [];
  products!: any[];
  localStorageEmpty!: boolean; // Variable to track whether localStorage is completely clear (empty)
  sellMaterilasproducts: any[] = [];
  searchInput: string = '';
  filterText: string = '';
  cartItems: any[] = []; // Declare an array to store cart items
  productIDOfCarts: string[] = [];
  phonenumber: string = '';
  amount: number = 0;

  constructor(
    private productsService: ProductService,
    private router: Router,
    private homeService: HomeService,
    private addToCart: AddtocartService,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit() {
    // this.getAllProductsDetails();
    this.localStorageEmpty = Object.keys(localStorage).length === 0;
    this.getCarts();
    this.getAllSellMaterials();

  }


  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }



  togglePhoneNumber(index: number) {
    const localStorageEmpty =localStorage.length<=3;
    
    if (localStorageEmpty) {
      this.showRegisterAlert();
    } else {
      // Check if the card index is already active, and toggle it
      if (this.activeCardIndices.includes(index)) {
        this.activeCardIndices = this.activeCardIndices.filter(
          (i) => i !== index
        );
      } else {
        this.activeCardIndices.push(index);
      }
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

  getByEmailDetails() {
    const localStorageEmpty = Object.keys(localStorage).length === 0;

    if (localStorageEmpty) {
      console.log('Not logged in to get by email');
    } else {
      const email = localStorage.getItem('email');

      if (email !== null) {
        this.homeService.getByEmail(email).subscribe(
          (response) => {
            console.log('Response:', response);
            // Handle the response here as needed
          },
          (error) => {
            console.error(error);
            // Handle errors, if any
          }
        );
      } else {
        console.log('Email is null. Cannot call getByEmail method.');
        // Handle the case where email is null, e.g., show an error message or set a default email.
      }
    }
  }

  getAllSellMaterials() {
    this.productsService.getAllProducts().subscribe((response: any) => {
      this.sellMaterilasproducts = this.formatDates(response);
      console.log(this.sellMaterilasproducts);
      this.products = this.sellMaterilasproducts.reverse();
      console.log(this.products);
    },
      (error: any) => {
        console.error(error);
      }
    )
  }
  formatDates(data: any[]): any[] {
    return data.map(item => {
      const date = new Date(item.selectedDate);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      return {
        ...item,
        selectedDate: formattedDate
      };
    });
  }

  applyFilter() {
    this.filteredProducts = this.products.filter(product =>
      // Customize the filtering logic based on your needs
      product.materialtype.includes(this.filterText) ||
      product.category.includes(this.filterText) ||
      product.location.includes(this.filterText)
      // Add more fields as needed
    );
  }

  addtocart(product: any) {
    const selectedProduct = product;
    console.log('Selected Product:', selectedProduct);
    this.amount = +selectedProduct.productPrice;
    console.log(this.amount, typeof(this.amount),"amounthsjkd");
    
    const userIdUser = localStorage.getItem('userId');
    selectedProduct.userId = userIdUser;
    console.log("User id setted " + selectedProduct);

    const localStorageEmpty =localStorage.length<=3;
    if (localStorageEmpty) {
      this.showRegisterAlert();
    } else {
      console.log("create cart trigger");

      this.productsService.createCart(selectedProduct).subscribe((response: any) => {
        let snackBarRef = this.snackBar.open("Product added to your cart !", "Close", { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom', });
        this.router.navigateByUrl('/addtocart');
        console.log(response);

        snackBarRef.onAction().subscribe(() => {
          console.log("the undo action is triggered");


        });
        snackBarRef.afterDismissed().subscribe(() => {
          console.log("the snack bar dismissed");
        })

      },
        (error) => {
          console.log('Error:', error);
          if (localStorageEmpty) {

            this.showRegisterAlert;
          }
        }

      )
    }
  }
  getCarts() {

    const localStorageEmpty = Object.keys(localStorage).length === 0;
    if (localStorageEmpty) {
      console.log("Not login to get carts");

    } else {
      const userIdUser = localStorage.getItem('userId');
      this.addToCart.getCartDetailsByUserID(userIdUser).subscribe((response: any) => {
        console.log(response, "jhsjkdhs");
        this.cartItems = response.reverse();
        this.phonenumber = response[0].mobileNumber;
        console.log(this.cartItems);
        this.productIDOfCarts = this.cartItems.map(item => item.productID);
        console.log(this.productIDOfCarts);


      },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      )
    }

  }

  isProductInCart(id: string): boolean {
    return this.productIDOfCarts.includes(id);
  }

  //payment
  createRazorpayOrder(product:any) {
    const localStorageEmpty =localStorage.length<=3;
    if (localStorageEmpty) {
      this.showRegisterAlert();
    }else{
    const orderRequest = {

      customerName: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      phoneNumber: this.phonenumber,
      amount: product.productPrice// Convert amount to paise if using INR
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

}
