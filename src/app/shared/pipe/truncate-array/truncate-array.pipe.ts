import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncateArray',
})
export class TruncateArrayPipe implements PipeTransform {
  constructor() {}
  transform(items?: any[], number: number = 0): any[] {
    if (!items) return [];
    if (number === 0) return items;
    return [...items].slice(0, number);
  }
}
