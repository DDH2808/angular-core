import {
  CUSTOM_ELEMENTS_SCHEMA,
  ErrorHandler,
  Injectable,
  NgModule,
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideEnvironmentNgxMask} from 'ngx-mask';
import {TranslocoRootModule} from '@share/internaitonalization/transloco-root.module';
import {NotfoundComponent} from '@app/page/notfound/notfound.component';
import {TokenInterceptor} from '@app/services/interceptor/token.interceptor';
import {CustomModalComponent} from '@share/custom/custom-modal/custom-modal.component';
import {NZ_I18N, vi_VN} from 'ng-zorro-antd/i18n';
import {NzConfig, provideNzConfig} from 'ng-zorro-antd/core/config';
import {FormLargeSizeDirective} from './shared/directive/default-input-size.directive';

registerLocaleData(localeVi, 'vi');

const ngZorroConfig: NzConfig = {
  button: {
    nzSize: 'large',
  },
};

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error(error);
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }
}

const uiModule = [
  ToastrModule.forRoot(),
  ModalModule.forRoot(),
  NgSelectModule,
];

const formModule = [FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslocoRootModule,
    [...uiModule],
    [...formModule],
    CustomModalComponent,
    FormLargeSizeDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: NZ_I18N, useValue: vi_VN},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: APP_BASE_HREF, useValue: (window as any)['_app_base'] || '/'},
    provideEnvironmentNgxMask(),
    provideNzConfig(ngZorroConfig),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
