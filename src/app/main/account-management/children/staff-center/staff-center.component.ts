import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {CommonModule} from '@angular/common';
import {
  ERole,
  EStatus,
  UserEntity,
  UserService,
} from '@app/services/api/user.service';
import {CommonService} from '@app/services/common/common.service';
import {FormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {PipeTimeViewModule} from '@app/shared/pipe/timeView.module';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {Subject, takeUntil} from 'rxjs';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {IModalConfirmContent} from '@app/shared/custom/modal-confirm/modal-confirm.component';
import {ModalConfirmService} from '@app/shared/custom/modal-confirm/modal-confirm.service';
import {ModalService} from '@app/shared/modal/modal.service';

export interface IDateRange {
  fromDate: Date;
  toDate: Date;
}

@Component({
  selector: 'app-staff-center',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PipeTimeViewModule,
    NzModalModule,
    NzTableModule,
    NzDividerModule,
    NzTagModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzIconModule,
  ],
  providers: [ModalService],
  templateUrl: './staff-center.component.html',
  styleUrl: './staff-center.component.scss',
})
export class StaffCenterComponent implements OnInit, OnDestroy {
  public userList?: UserEntity[];

  public item: any = {
    rows: [],
    loading: false,
    paramsQuery: {
      pageSize: 10,
      pageNumber: 1,
      sort: '-createdAt',
    },
    total: 0,
  };

  ERole = ERole;
  roles = Object.values(ERole);
  selectedRole: ERole | null = null;
  searchKeyword: string = '';
  dateRange: Date[] = [];

  selectedStatus: EStatus | null = null;
  statusOptions: {label: string; value: EStatus}[] = [];

  sortColumn: string = '';
  sortOrder: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private readonly users: UserService,
    private readonly commonService: CommonService,
    private modalService: ModalService,
    private readonly modalConfirmService: ModalConfirmService,
  ) {}

  ngOnInit(): void {
    this.getUsers();

    this.statusOptions = [
      {label: 'Kích hoạt', value: EStatus.ACTIVE},
      {label: 'Tạm dừng', value: EStatus.DELETED},
    ];
  }

  getUsers() {
    this.item.loading = true;
    this.users.user
      .getListUsers(this.item.paramsQuery)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.item.loading = false;
          if (res.statusCode === 200) {
            this.item.rows = res.data;
            this.item.total = res.meta?.totalItems || 0;
            this.userList = res.data;
          } else {
            this.item.loading = false;
            this.commonService.handleResErr(res);
          }
        },
      });
  }

  search(): void {
    this.item.paramsQuery.pageNumber = 1;

    let params = {...this.item.paramsQuery};

    let filterObj: any = {};

    if (this.searchKeyword && this.searchKeyword.trim() !== '') {
      params = {
        ...params,
        'search': this.searchKeyword,
        'searchFields[]': ['fullName', 'username'],
      };
    }

    if (this.selectedRole) {
      filterObj.role = this.selectedRole;
    }

    if (this.selectedStatus !== null) {
      filterObj.status = this.selectedStatus;
    }

    if (this.dateRange && this.dateRange.length === 2) {
      const startDate = this.formatDate(this.dateRange[0]);
      const endDate = this.formatDate(this.dateRange[1]);

      filterObj['createdAt_range'] = [startDate, endDate];
    }

    if (Object.keys(filterObj).length > 0) {
      params.filter = JSON.stringify(filterObj);
    }

    this.getUsersWithParams(params);
  }

  onSortChange(column: string, order: string | null) {
    this.sortColumn = column;
    this.sortOrder =
      order === 'ascend' ? 'asc' : order === 'descend' ? 'desc' : '';

    let sortString = '';
    if (this.sortColumn && this.sortOrder) {
      sortString =
        this.sortOrder === 'asc' ? this.sortColumn : `-${this.sortColumn}`;
    } else {
      sortString = '-createdAt';
    }

    this.item.paramsQuery.sort = sortString;
    this.getUsers();
  }

  getUsersWithParams(params: any) {
    this.item.loading = true;

    this.users.user
      .getListUsers(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.item.loading = false;
          if (res.statusCode === 200) {
            this.item.rows = res.data;
            this.item.total = res.meta?.totalItems || 0;
            this.userList = res.data;
          } else {
            this.commonService.handleResErr(res);
          }
        },
        error: (err) => {
          this.item.loading = false;
          this.commonService.handleErr(err);
        },
      });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onPageChange(page: number) {
    this.item.paramsQuery.pageNumber = page;
    this.getUsers();
  }

  onPageSizeChange(size: number) {
    this.item.paramsQuery.pageSize = size;
    this.item.paramsQuery.pageNumber = 1;
    this.getUsers();
  }

  onDeleteRecord(value: number) {
    this.users.user
      .bulkDelete([value])
      .pipe()
      .subscribe({
        next: (res) => {
          if (res.statusCode !== 200) {
            this.commonService.handleResErr(res);
          } else {
            this.commonService.handleResSuccess('delete');
            this.getUsers();
          }
        },
      });
  }

  handleDeleteAction(value: UserEntity) {
    const title = `Bạn có chắc chắn muốn xóa ${value?.username}?`;
    const description =
      'Tất cả bản ghi được chọn sẽ bị xóa vĩnh viễn khỏi hệ thống.';
    const okText = 'Xóa';
    const modalContent: IModalConfirmContent = {
      title,
      description,
      okText,
      type: 'warning',
      modalType: 'advance',
      context: value,
    };

    this.modalConfirmService.openModal(modalContent, undefined, () => {
      this.onDeleteRecord(value.id);
    });
  }

  editUser(item?: UserEntity): void {
    const modalRef = this.modalService.openUserModal(item);

    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
