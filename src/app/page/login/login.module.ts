import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from '@app/page/login/login.component';
import {LoginRoutingModule} from '@app/page/login/login-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomButtonLoadingComponent} from '@app/shared/custom/custom-button-loading/custom-button-loading.component';
import {TranslocoModule} from '@jsverse/transloco';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {FormLargeSizeDirective} from '@app/shared/directive/default-input-size.directive';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomButtonLoadingComponent,
    TranslocoModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    FormLargeSizeDirective,
  ],
})
export class LoginModule {}
