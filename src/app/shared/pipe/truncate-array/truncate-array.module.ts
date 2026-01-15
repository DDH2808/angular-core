import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TruncateArrayPipe} from './truncate-array.pipe';

@NgModule({
  declarations: [TruncateArrayPipe],
  imports: [CommonModule],
  exports: [TruncateArrayPipe],
})
export class TruncateArrayModule {}
