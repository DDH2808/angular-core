import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountManagementComponent} from './account-management.component';
import {AccountManagementRoutingModule} from './account-management-routing.module';
import {HeaderModule} from '@share/layout/header/header.module';
import {ImagePreviewComponent} from '@share/common/image-preview/image-preview.component';
import {ModalConfirmComponent} from '@share/custom/modal-confirm/modal-confirm.component';
import {SidebarModule} from '@share/layout/sidebar/sidebar.module';
import {AdminStationComponent} from './children/admin-station/admin-station.component';
import {CustomInputSearchComponent} from '@share/custom/custom-input-search/custom-input-search.component';
import {CustomSelectSearchComponent} from '@share/custom/custom-select-search/custom-select-search.component';

@NgModule({
  declarations: [AccountManagementComponent],
  imports: [
    CommonModule,
    AdminStationComponent,
    AccountManagementRoutingModule,
    HeaderModule,
    ImagePreviewComponent,
    ModalConfirmComponent,
    SidebarModule,
    CustomInputSearchComponent,
    CustomSelectSearchComponent,
  ],
})
export class AccountManagementModule {}
