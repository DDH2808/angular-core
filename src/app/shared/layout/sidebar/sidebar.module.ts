import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {RouterModule} from '@angular/router';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {LogoModule} from 'smaxapp';
import {FallbackImageModule} from '@share/directive/fallback-image/fallback-image.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    LogoModule,
    TooltipModule.forRoot(),
    NgOptimizedImage,
    FallbackImageModule,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
