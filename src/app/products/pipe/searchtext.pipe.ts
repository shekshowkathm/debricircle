import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchtext',
})
export class SearchtextPipe implements PipeTransform {
  transform(products: any[], searchText: string): any[] {
    if (!searchText) {
      return products;
    }

    searchText = searchText.toLowerCase();

    return products.filter((product) => {
      return (
        product.materialtype.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        product.quality.toLowerCase().includes(searchText) ||
        product.location.toLowerCase().includes(searchText)
      );
    });
  }
}
