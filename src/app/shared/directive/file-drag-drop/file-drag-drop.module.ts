import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileDragNDropDirective} from '@share/directive/file-drag-drop/file-drag-drop.directive';

@NgModule({
  declarations: [FileDragNDropDirective],
  imports: [CommonModule],
  exports: [FileDragNDropDirective],
})
export class FileDragDropModule {}
