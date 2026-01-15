import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApiService} from '@app/services/api/base.service';
import {environment} from '../../../environments/environment';
import {EntityResult, IQueryBase} from '@app/types/viewmodels';
import {cleanObject} from '@app/utils';

export interface IAccountRes {
  id: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt: string;
  createdBy?: {
    username: string;
  };
  updatedBy?: {
    username: string;
  };
  deletedBy?: any;
  displayName: string;
  eGateCode?: string;
  borderGateCode: string;
  unit: string;
  note: string;
  syncStatus: number;
  account?: {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    createdBy?: {
      username: string;
    };
    updatedBy?: {
      username: string;
    };
    deletedBy?: {
      username: string;
    };
    fullName: string;
    note: string;
    staffCode: string;
    centerInChargeStaffCode: string;
    pwdUpdatedAt: string;
    eGateCode: string;
  };
}

export interface IAccountBody {
  centerInChargeStaffCode: string;
  eGateCode: string;
  fullName: string;
  note: string;
  staffCode: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountsService extends BaseApiService {
  public api = {
    root: 'e-gate/accounts',
  };

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setApiAddress(environment.apiAddress, '');
  }

  accounts = {
    getAccounts: (params: IQueryBase) =>
      this.httpClient.get<EntityResult<IAccountRes[]>>(
        this.createUrl([this.api.root]),
        {
          params: cleanObject(params),
        },
      ),
    updateAccount: (body: IAccountBody) =>
      this.httpClient.patch<EntityResult<unknown>>(
        this.createUrl([this.api.root, 'text']),
        body,
      ),
  };
}
