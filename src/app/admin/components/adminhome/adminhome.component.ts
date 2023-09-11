import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss'],
})
export class AdminhomeComponent {
  registerListTotal: any;
  productListTotal: any;
  nonSegregatedListTotal: any;
  segregatedListTotal: any;
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getAllRegisterList();
    this.getAllProducts();
    this.getAllNonSegregated();
    this.getAllSegregatedWaste();
  }

  getAllRegisterList() {
    this.adminService.getAllData().subscribe(
      (response: any) => {
        console.log(response);
        this.registerListTotal = response.length;
        console.log(this.registerListTotal);
      },
      (error) => {
        console.error('Not data get', error);
      }
    );
  }
  getAllProducts() {
    this.adminService.getAllProductsData().subscribe(
      (response: any) => {
        console.log(response);

        this.productListTotal = response.length;
        console.log(this.productListTotal);
      },
      (error) => {
        console.error('Not data get', error);
      }
    );
  }

  getAllNonSegregated() {
    this.adminService.getAllNonSegregated().subscribe(
      (response: any) => {
        console.log(response);

        this.nonSegregatedListTotal = response.reduce(
          (total: any, item: any) => total + parseInt(item.volume),
          0
        );
        console.log(this.nonSegregatedListTotal);
      },
      (error) => {
        // Handle the error response
        console.error('GET error:', error);
      }
    );
  }

  getAllSegregatedWaste() {
    this.adminService.getAllSegregated().subscribe((response: any) => {
      console.log(response);
      this.segregatedListTotal = response.reduce(
        (total: any, item: any) => total + parseInt(item.totalVolume),
        0
      );
      console.log(this.segregatedListTotal);
    });
  }

  homeDashboard() {
    this.adminService.updateLocation('registerlist');
  }
  productlist() {
    this.adminService.updateLocation('productlist');
  }
  segregated() {
    this.adminService.updateLocation('segregated');
  }
  nonSegregated() {
    this.adminService.updateLocation('nonsegregated');
  }
  wastePlan() {
    this.adminService.updateLocation('waste');
  }
}
