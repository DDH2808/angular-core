import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {RouterModule} from '@angular/router';
import {LogoModule} from 'smaxapp';
import {BreadcrumbComponent} from '@app/shared/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    LogoModule,
    BsDropdownModule.forRoot(),
    BreadcrumbComponent,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
