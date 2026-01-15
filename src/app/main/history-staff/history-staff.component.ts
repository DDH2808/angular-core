import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  HistoryStaffService,
  IHistoryStaffEntity,
} from '@app/services/api/history-staff.service';
import {CommonService} from '@app/services/common/common.service';
import {NzTableModule} from 'ng-zorro-antd/table';
import {Subject, takeUntil} from 'rxjs';
import {PipeTimeViewModule} from '../../shared/pipe/timeView.module';
import {PipeOfficerLabelViewModule} from '../../shared/pipe/officer-label.module';
import {PipeEventTypeViewModule} from '@app/shared/pipe/even-type.module';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {FormsModule} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {EVENT_TYPES} from '@app/shared/pipe/even-type.pipe';
import {
  DefaultOptionType,
  OfficerActionService,
} from '@app/services/common/officer-action.service';
import {FormLargeSizeDirective} from '@app/shared/directive/default-input-size.directive';
import {NzIconModule} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-history-staff',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzDividerModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzDatePickerModule,
    PipeTimeViewModule,
    FormLargeSizeDirective,
    PipeOfficerLabelViewModule,
    NzButtonModule,
    NzIconModule,
    PipeEventTypeViewModule,
  ],
  templateUrl: './history-staff.component.html',
  styleUrl: './history-staff.component.scss',
})
export class HistoryStaffComponent implements OnInit, OnDestroy {
  public historyStaffList: IHistoryStaffEntity[] = [];

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

  public username: string = '';
  public createdAt_range: Date[] = [];
  public eventType_in: string[] = [];
  public actionType_in: string[] = [];

  public optionsEventypes = Object.entries(EVENT_TYPES).map(
    ([value, label]) => ({
      value,
      label,
    }),
  );
  public optionsActionTypes: DefaultOptionType[] = [];

  constructor(
    private readonly officerActionService: OfficerActionService,
    private readonly historyStaffService: HistoryStaffService,
    private readonly commonService: CommonService,
  ) {
    this.optionsActionTypes = this.officerActionService.getOptions();
  }

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.item.loading = true;

    this.historyStaffService.historyStaff
      .getList(this.item.paramsQuery)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.item.loading = false;
          if (res.statusCode === 200) {
            this.item.rows = res.data;
            this.item.total = res.meta?.totalItems || 0;
            this.historyStaffList = res.data;
          } else {
            this.item.loading = false;
            this.commonService.handleResErr(res);
          }
        },
      });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  search(): void {
    this.item.paramsQuery.pageNumber = 1;

    let params = {...this.item.paramsQuery};

    let filterObj: any = {};

    if (this.username && this.username.trim() !== '') {
      filterObj.username = this.username.trim();
    }

    if (this.eventType_in && this.eventType_in.length > 0) {
      filterObj.eventType_in = this.eventType_in;
    }

    if (this.actionType_in && this.actionType_in.length > 0) {
      filterObj.actionType_in = this.actionType_in;
    }

    if (this.createdAt_range && this.createdAt_range.length === 2) {
      const startDate = this.formatDate(this.createdAt_range[0]);
      const endDate = this.formatDate(this.createdAt_range[1]);

      if (startDate && endDate) {
        filterObj.createdAt_range = [startDate, endDate];
      }
    }

    if (Object.keys(filterObj).length > 0) {
      params.filter = JSON.stringify(filterObj);
    }

    this.item.paramsQuery = params;

    this.getData();
  }

  onPageChange(page: number) {
    this.item.paramsQuery.pageNumber = page;
    this.getData();
  }

  onPageSizeChange(size: number) {
    this.item.paramsQuery.pageSize = size;
    this.item.paramsQuery.pageNumber = 1;
    this.getData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
