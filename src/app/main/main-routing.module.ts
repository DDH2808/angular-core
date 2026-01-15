import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {NotfoundComponent} from '@app/page/notfound/notfound.component';
import {SuperviseSystemStatusComponent} from '@main/supervise-system-status/supervise-system-status.component';
import {SettingsComponent} from './settings/settings.component';
import {HistoryStaffComponent} from './history-staff/history-staff.component';
import {isSuperAdminGuard} from '@app/services/guard/is-super-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'account-management',
        pathMatch: 'full',
      },
      {
        path: 'account-management',
        loadChildren: () =>
          import('@main/account-management/account-management.module').then(
            (m) => m.AccountManagementModule,
          ),
      },
      {
        path: 'management',
        loadChildren: () =>
          import('@main/management/management.module').then(
            (m) => m.ManagementModule,
          ),
      },
      {
        path: 'supervise-system-status',
        component: SuperviseSystemStatusComponent,
      },
      {
        path: 'supervise-sync-station',
        component: SuperviseSystemStatusComponent,
      },
      {
        path: 'settings',
        canActivate: [isSuperAdminGuard],
        component: SettingsComponent,
      },
      {
        path: 'history-staff',
        canActivate: [isSuperAdminGuard],
        component: HistoryStaffComponent,
      },
    ],
  },
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
