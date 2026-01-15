import {Pipe, type PipeTransform} from '@angular/core';
import {OfficerActionService} from '@app/services/common/officer-action.service';

@Pipe({
  name: 'officerLabel',
  pure: true,
})
export class OfficerLabelPipe implements PipeTransform {
  constructor(private officerActionService: OfficerActionService) {}

  transform(value: string | null | undefined): string {
    if (!value) return '-';
    return this.officerActionService.getLabelByValue(value);
  }
}
