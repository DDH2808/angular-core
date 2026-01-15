import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {SidebarModule} from '@app/shared/layout/sidebar/sidebar.module';
import {HeaderModule} from '@app/shared/layout/header/header.module';
import {RouterOutlet} from '@angular/router';
import {ModalConfirmComponent} from '@share/custom/modal-confirm/modal-confirm.component';
import {AuthService} from '@app/services/api/auth.service';
import {CommonService} from '@app/services/common/common.service';
import {ImagePreviewComponent} from '@share/common/image-preview/image-preview.component';
import {CustomModalComponent} from '@share/custom/custom-modal/custom-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {CustomButtonLoadingComponent} from '@share/custom/custom-button-loading/custom-button-loading.component';
import {ManagementComponent} from './management/management.component';
import {SuperviseSystemStatusComponent} from './supervise-system-status/supervise-system-status.component';
import {SuperviseSyncStationComponent} from './supervise-sync-station/supervise-sync-station.component';
import {SettingsComponent} from './settings/settings.component';
import {HistoryStaffComponent} from './history-staff/history-staff.component';

@NgModule({
  declarations: [
    MainComponent,
    ManagementComponent,
    SuperviseSystemStatusComponent,
    SuperviseSyncStationComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SidebarModule,
    HeaderModule,
    RouterOutlet,
    ModalConfirmComponent,
    ImagePreviewComponent,
    CustomModalComponent,
    ReactiveFormsModule,
    NgSelectModule,
    HistoryStaffComponent,
    SettingsComponent,
    CustomButtonLoadingComponent,
  ],
})
export class MainModule {
  constructor(
    private readonly authService: AuthService,
    private readonly commonService: CommonService,
  ) {
    if (this.authService.isAuthenticated()) {
      this.authService.user
        .getMe()
        .pipe()
        .subscribe({
          next: (res) => {
            if (res.statusCode === 200) {
              this.authService.setUser(res.data);
              if (!res.data?.avatar && res.data?.fullName) {
                handleGenerateUIAvatar(res.data?.fullName);
              }
            } else {
              this.commonService.handleResErr(res);
            }
          },
        });

      const handleGenerateUIAvatar = (name: string) => {
        fetch(`https://ui-avatars.com/api/?name=${name}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('err');
            }
            return response.blob();
          })
          .then((blob) => {
            const myFile = new File([blob], 'image.jpeg', {
              type: blob.type,
            });
            handleUpdateAvatar(myFile);
          })
          .catch((error) => {
            console.error(
              'There was a problem with the fetch operation:',
              error,
            );
          });
      };

      const handleUpdateAvatar = (file: any) => {
        this.authService.user.setAvatar({file}).subscribe((res) => {
          if (res.statusCode === 200) {
            this.authService.setUser(res.data);
          }
        });
      };
    }
  }
}
