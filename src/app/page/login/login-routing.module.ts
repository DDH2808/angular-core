import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '@app/page/login/login.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {path: '**', redirectTo: 'notfound'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
