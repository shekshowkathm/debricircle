import { Component } from '@angular/core';
import { AddtocartService } from '../../service/addtocart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  panelOpenState = false;
  cartItems: any[] = []; // Declare an array to store cart items



  constructor(private addToCart:AddtocartService){}

  ngOnInit(): void {
    this.getCarts();
  }


  getCarts(){
    const userIdUser = localStorage.getItem('userId');
    this.addToCart.getCartDetailsByUserID(userIdUser).subscribe((response:any)=>{
      console.log(response);
      this.cartItems = response.reverse();
      console.log(this.cartItems);

    },
    (error) => {
      console.error('Error fetching product details:', error);
    }
    )
  }


}
