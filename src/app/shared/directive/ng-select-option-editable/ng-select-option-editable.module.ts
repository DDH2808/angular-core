import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgSelectOptionEditableDirective} from './ng-select-option-editable.directive';

@NgModule({
  declarations: [NgSelectOptionEditableDirective],
  imports: [CommonModule],
  exports: [NgSelectOptionEditableDirective],
})
export class NgSelectOptionEditableModule {}
