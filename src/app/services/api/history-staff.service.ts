import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseApiService} from './base.service';
import {environment} from 'src/environments/environment';
import {EntityResult} from '@app/types/viewmodels';
import {cleanObject} from '@app/utils';

export interface IHistoryStaffEntity {
  actionType: string;
  eventType: string;
  id: number;
  centerId: number;
  eGateCode: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  createdBy?: {
    id: number;
    username: string;
  };
  updatedBy?: {
    id: number;
    username: string;
  };
  deletedBy?: {
    id: number;
    username: string;
  };
  lastSyncAt?: string;
  syncRetry: number;
  username: string;
  passenger: any;
}

@Injectable({
  providedIn: 'root',
})
export class HistoryStaffService extends BaseApiService {
  public api = {
    root: 'officer-activities',
  };
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setApiAddress(environment.apiAddress, '');
  }

  historyStaff = {
    getList: (params: any) =>
      this.httpClient.get<EntityResult<IHistoryStaffEntity[]>>(
        this.createUrl([this.api.root]),
        {
          params: cleanObject(params),
        },
      ),
  };
}
