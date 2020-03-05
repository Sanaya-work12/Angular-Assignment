import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

    actualItems: any[];

  transform(items: any[], selected: string[]): any {
    if (!items || !selected) {
      return items;
    }
    if (items !== this.actualItems) {
      this.actualItems = items;
    }
    return items;
  }

}
