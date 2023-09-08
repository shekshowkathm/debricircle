import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }

    return items.filter((item) => {
      // Implement your filtering logic here based on the filter object
      // For example:
      const qualityMatch = filter.quality
        ? item.quality === filter.quality
        : true;
      const categoryMatch = filter.category
        ? item.category === filter.category
        : true;
      const locationMatch = filter.location
        ? item.location === filter.location
        : true;
      const materialtypeMatch = filter.materialtype
        ? item.materialtype === filter.materialtype
        : true;

      return (
        qualityMatch && categoryMatch && locationMatch && materialtypeMatch
      );
    });
  }
}
