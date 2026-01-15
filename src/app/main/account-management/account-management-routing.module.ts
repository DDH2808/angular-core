import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountManagementComponent} from './account-management.component';
import {NotfoundComponent} from '@app/page/notfound/notfound.component';
import {StaffCenterComponent} from '@main/account-management/children/staff-center/staff-center.component';
import {AdminStationComponent} from '@main/account-management/children/admin-station/admin-station.component';

const routes: Routes = [
  {
    path: '',
    component: AccountManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'staff-center',
        pathMatch: 'full',
      },
      {
        path: 'staff-center',
        component: StaffCenterComponent,
      },
      {
        path: 'admin-station',
        component: AdminStationComponent,
      },
    ],
  },
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountManagementRoutingModule {}
