import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagementComponent} from '@main/management/management.component';
import {StationManagementComponent} from '@main/management/children/station-management/station-management.component';
import {GroupManagementComponent} from '@main/management/children/group-management/group-management.component';
import {RegisteredPassengerManagementComponent} from '@main/management/children/registered-passenger-management/registered-passenger-management.component';
import {IoCategoryManagementComponent} from '@main/management/children/io-category-management/io-category-management.component';
import {NotfoundComponent} from '@app/page/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'station-management',
        pathMatch: 'full',
      },
      {
        path: 'station-management',
        component: StationManagementComponent,
      },
      {
        path: 'group-management',
        component: GroupManagementComponent,
      },
      {
        path: 'registered-passenger-management',
        component: RegisteredPassengerManagementComponent,
      },
      {
        path: 'io-category-management',
        component: IoCategoryManagementComponent,
      },
    ],
  },
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
