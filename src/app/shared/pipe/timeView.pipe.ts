import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from 'src/app/utils/formatDate';

@Pipe({name: 'timeView'})
export class TimeViewPipe implements PipeTransform {
  transform(
    time: string | Date | null | undefined,
    format: 'default' | 'dateOnly' = 'default',
  ): string {
    if (!time) return '';

    if (format === 'dateOnly') {
      return formatDate(time, 'd/MM/yyyy');
    }

    return formatDate(time, 'h:mm dd/MM/yyyy');
  }
}
