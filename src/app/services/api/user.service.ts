import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApiService} from './base.service';
import {EntityResult, User} from 'src/app/types/viewmodels';
import {environment} from 'src/environments/environment';
import {cleanObject} from '@app/utils';

export enum ERole {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  User = 'User',
}

export enum EStatus {
  IN_ACTIVE,
  ACTIVE,
  DELETED,
}

export interface UserEntity {
  id: number;
  password: string;
  role: ERole | null;
  fullName: string;
  username?: string;
  status: EStatus | null;
  createdAt?: string;
}

export interface CreateUserDto extends Omit<UserEntity, 'id'> {}

export interface UpdateUserDto extends Partial<UserEntity> {}

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiService {
  public api = {
    root: 'users',
  };

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setApiAddress(environment.apiAddress, '');
  }

  user = {
    get: (id: string) =>
      this.httpClient.get<EntityResult<User>>(this.createUrl(['users', id])),
    getListUsers: (params: any) =>
      this.httpClient.get<EntityResult<UserEntity[]>>(
        this.createUrl([this.api.root]),
        {
          params: cleanObject(params),
        },
      ),

    updateRecord: (id: string, body: UpdateUserDto) =>
      this.httpClient.patch<EntityResult<unknown>>(
        this.createUrl([this.api.root, id]),
        body,
      ),

    createUser: (body: CreateUserDto) =>
      this.httpClient.post<EntityResult<unknown>>(
        this.createUrl([this.api.root]),
        body,
      ),

    bulkDelete: (ids: number[]) => {
      const httpOptions = {
        body: {
          ids,
        },
      };
      return this.httpClient.delete<EntityResult<unknown>>(
        this.createUrl([this.api.root, 'bulk-delete']),
        httpOptions,
      );
    },
  };
}
