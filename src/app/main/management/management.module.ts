import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagementRoutingModule} from './management-routing.module';
import {StationManagementComponent} from './children/station-management/station-management.component';
import {GroupManagementComponent} from './children/group-management/group-management.component';
import {RegisteredPassengerManagementComponent} from '@main/management/children/registered-passenger-management/registered-passenger-management.component';
import {IoCategoryManagementComponent} from './children/io-category-management/io-category-management.component';

@NgModule({
  declarations: [
    StationManagementComponent,
    RegisteredPassengerManagementComponent,
    IoCategoryManagementComponent,
  ],
  imports: [CommonModule, ManagementRoutingModule, GroupManagementComponent],
})
export class ManagementModule {}
