import {Component} from '@angular/core';
import {ICommonDataSource, IQueryBase} from '@app/types/viewmodels';
import {CommonService} from '@app/services/common/common.service';
import {EGatesService, IEGatesRes} from '@app/services/api/e-gates.service';
import {CustomInputSearchComponent} from '@share/custom/custom-input-search/custom-input-search.component';
import {NgForOf, NgIf} from '@angular/common';
import {AccountsService, IAccountRes} from '@app/services/api/accounts.service';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-admin-station',
  templateUrl: './admin-station.component.html',
  standalone: true,
  styleUrl: './admin-station.component.scss',
  imports: [
    CustomInputSearchComponent,
    NgIf,
    NgForOf,
    NzSelectComponent,
    FormsModule,
    NzOptionComponent,
    NzDatePickerModule,
  ],
})
export class AdminStationComponent {
  public accounts: ICommonDataSource<IAccountRes, IQueryBase> = {
    rows: [],
    loading: false,
    paramsQuery: {
      pageNumber: 1,
      pageSize: 10,
      sort: '-id',
    },
    total: 0,
  };

  public eGates: ICommonDataSource<IEGatesRes, IQueryBase> = {
    rows: [],
    loading: false,
    paramsQuery: {
      pageNumber: 1,
      pageSize: 10,
      sort: '-id',
    },
    total: 0,
  };

  public loading = {
    accounts: false,
    eGates: false,
  };

  selectedValue = null;
  date = null;

  constructor(
    private readonly accountsService: AccountsService,
    private readonly eGatesService: EGatesService,
    private readonly commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.getAccounts();
    this.getEGates();
  }

  getAccounts() {
    this.loading.accounts = true;
    this.accountsService.accounts
      .getAccounts(this.accounts.paramsQuery)
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.accounts.total = res.meta?.totalItems ?? 0;
            this.accounts.rows = res.data;
          } else {
            this.commonService.handleResErr(res);
          }
        },
      });
  }

  getEGates() {
    this.loading.eGates = true;
    this.eGatesService.eGates.getEGates(this.eGates.paramsQuery).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.eGates.total = res.meta?.totalItems ?? 0;
          this.eGates.rows = res.data;
        } else {
          this.commonService.handleResErr(res);
        }
      },
    });
  }

  onSearchData(term: string) {
    this.accounts.paramsQuery = {
      ...this.accounts.paramsQuery,
      'search': term,
      'searchFields[]': ['eGateCode', 'displayName'],
    };
    this.getAccounts();
  }

  onChange(value: string) {
    this.accounts.paramsQuery = {
      ...this.accounts.paramsQuery,
      filter: {
        ...this.accounts.paramsQuery.filter,
        eGateCode: value,
      },
    };
    this.getAccounts();
  }
}
