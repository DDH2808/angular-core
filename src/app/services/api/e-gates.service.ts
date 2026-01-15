import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApiService} from '@app/services/api/base.service';
import {environment} from '../../../environments/environment';
import {EntityResult, IQueryBase} from '@app/types/viewmodels';

export interface IEGatesRes {
  id: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt: null;
  createdBy: {
    username: number;
  };
  updatedBy?: {
    username: number;
  };
  deletedBy: any;
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
    deletedAt: string;
    createdBy: any;
    updatedBy: any;
    deletedBy: any;
    fullName: string;
    note: string;
    staffCode: string;
    centerInChargeStaffCode: string;
    pwdUpdatedAt: string;
    eGateCode: string;
  };
  group?: any;
}

export interface IEGateBody {
  syncStatus: number;
  displayName: string;
  eGateCode: string;
  borderGateCode: string;
  authorization: string;
  unit: string;
  note: string;
}

@Injectable({
  providedIn: 'root',
})
export class EGatesService extends BaseApiService {
  public api = {
    root: 'e-gates',
  };

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setApiAddress(environment.apiAddress, '');
  }

  eGates = {
    getEGates: (params: IQueryBase) =>
      this.httpClient.get<EntityResult<IEGatesRes[]>>(
        this.createUrl([this.api.root]),
        {
          params: this.createParams(params),
        },
      ),
    createEGate: (body: IEGateBody) =>
      this.httpClient.post<EntityResult<unknown>>(
        this.createUrl([this.api.root, 'text']),
        body,
      ),
  };
}
