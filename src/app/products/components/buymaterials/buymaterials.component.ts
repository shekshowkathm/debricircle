import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-buymaterials',
  templateUrl: './buymaterials.component.html',
  styleUrls: ['./buymaterials.component.scss'],
})
export class BuymaterialsComponent {
  getAllProducts: any[] = []; // Initialize as an empty array
  showPhoneNumber = false; // Add this variable
  activeCardIndices: number[] = []; // Array to store the indices of active cards

  constructor(private productsService: ProductService) {}
  ngOnInit() {
    this.getAllProductsDetails();
  }

  getAllProductsDetails() {
    this.productsService.getProductList().subscribe((data: any) => {
      this.getAllProducts = data.map((item: any) => {
        const id = item.payload.doc.id;
        const docData = item.payload.doc.data();
        // Check if selectedDate is not null before converting it to a Date object
        const selectedDate = docData.selectedDate
          ? docData.selectedDate.toDate()
          : 'Immediate';

        // If selectedDate is a valid Date object, format it to get only the date string
        const formattedDate =
          selectedDate instanceof Date
            ? selectedDate.toLocaleDateString()
            : selectedDate;

        return { id, ...docData, selectedDate: formattedDate }; // Include the formatted date in the returned object
      });
      console.log(this.getAllProducts);
      console.log(this.getAllProducts[1].selectedDate);
    });
  }

  togglePhoneNumber(index: number) {
    // Check if the card index is already active, and toggle it
    if (this.activeCardIndices.includes(index)) {
      this.activeCardIndices = this.activeCardIndices.filter((i) => i !== index);
    } else {
      this.activeCardIndices.push(index);
    }
  }
}
