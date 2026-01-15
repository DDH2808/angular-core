import {Injectable} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {UserModalComponent} from './user-modal/user-modal.component';
import {UserEntity} from '@app/services/api/user.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private nzModalService: NzModalService) {}

  openUserModal(item?: UserEntity) {
    const modalRef = this.nzModalService.create<UserModalComponent>({
      nzTitle: item ? 'Chỉnh sửa người dùng' : 'Thêm người dùng',
      nzContent: UserModalComponent,
      nzData: {
        user: item,
      },
      nzFooter: null,
      nzWidth: 460,
    });

    return modalRef;
  }
}
