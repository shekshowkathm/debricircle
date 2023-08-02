import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/home/service/home.service';

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

  constructor(
    private productsService: ProductService,
    private router: Router,
    private homeService: HomeService
  ) {}
  ngOnInit() {
    this.getAllProductsDetails();
    this.localStorageEmpty = Object.keys(localStorage).length === 0;
    this.getByEmailDetails();
  }

  // getAllProductsDetails() {
  //   this.productsService.getProductList().subscribe((data: any) => {
  //     this.getAllProducts = data.map((item: any) => {
  //       const id = item.payload.doc.id;
  //       const docData = item.payload.doc.data();
  //       // Check if selectedDate is not null before converting it to a Date object
  //       const selectedDate = docData.selectedDate
  //         ? docData.selectedDate.toDate()
  //         : 'Immediate';

  //       // If selectedDate is a valid Date object, format it to get only the date string
  //       const formattedDate =
  //         selectedDate instanceof Date
  //           ? selectedDate.toLocaleDateString()
  //           : selectedDate;

  //       return { id, ...docData, selectedDate: formattedDate }; // Include the formatted date in the returned object
  //     });
  //     console.log(this.getAllProducts);
  //     console.log(this.getAllProducts[1].selectedDate);
  //     this.filteredProducts = this.getAllProducts;
  //     this.products = this.getAllProducts;
  //     console.log(this.products);
  //   });
  // }
  getAllProductsDetails() {
    this.productsService.getProductList().subscribe((data: any) => {
      this.getAllProducts = data.map((item: any) => {
        const id = item.payload.doc.id;
        const docData = item.payload.doc.data();
        // Check if selectedDate is not null before converting it to a Date object
        const selectedDate = docData.selectedDate
          ? docData.selectedDate.toDate()
          : 'Immediate';

        // If selectedDate is a valid Date object, format it to get the dd/mm/yyyy string
        const formattedDate =
          selectedDate instanceof Date
            ? this.formatDate(selectedDate)
            : selectedDate;

        return { id, ...docData, selectedDate: formattedDate }; // Include the formatted date in the returned object
      });

      // Sort the products based on selectedDate in descending order (most recent first)
      this.getAllProducts.sort((a: any, b: any) => {
        if (a.selectedDate > b.selectedDate) {
          return -1;
        } else if (a.selectedDate < b.selectedDate) {
          return 1;
        } else {
          return 0;
        }
      });

      console.log(this.getAllProducts);
      console.log(this.getAllProducts[1].selectedDate);
      this.filteredProducts = this.getAllProducts;
      this.products = this.getAllProducts;
      console.log(this.products);
    });
  }


formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}



  togglePhoneNumber(index: number) {
    const localStorageEmpty = Object.keys(localStorage).length === 0;

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
}
