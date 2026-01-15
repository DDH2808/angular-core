import {NgModule} from '@angular/core';
import {
  provideRouter,
  RouterModule,
  Routes,
  withPreloading,
} from '@angular/router';
import {NotfoundComponent} from '@app/page/notfound/notfound.component';
import {FlagBasedPreloadingStrategy} from '@app/services/common/customPreloader.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./page/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () => import('@main/main.module').then((m) => m.MainModule),
    data: {preload: true},
  },

  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withPreloading(FlagBasedPreloadingStrategy)),
  ],
})
export class AppRoutingModule {}
