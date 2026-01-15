import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UrlifyPipe} from '@share/pipe/urlify/urlify.pipe';

@NgModule({
  declarations: [UrlifyPipe],
  imports: [CommonModule],
  exports: [UrlifyPipe],
})
export class UrlifyModule {}
