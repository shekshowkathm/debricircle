import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: any): any[] {
    if (!items || !field || value === null || value === undefined) {
      return items;
    }
    return items.filter(item => item[field] === value);
  }
  // transform(items: any[], field: string, value: any): any[] {
  //   if (!items || !field || value === null || value === undefined) {
  //     return items;
  //   }

  //   // Apply the first filter based on 'category' if selectedCategory has a value
  //   let filteredItems = items;
  //   if (field === 'category' && value) {
  //     filteredItems = items.filter(item => item[field].toLowerCase() === value.toLowerCase());
  //   }

  //   // Apply the second filter based on 'quality' if selectedQuality has a value
  //   if (field === 'quality' && value) {
  //     filteredItems = filteredItems.filter(item => item[field] === value);
  //   }

  //   return filteredItems;
  // }


}
