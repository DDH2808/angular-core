export interface ObjectAny {
  [name: string]: any;
}

export interface ICommonDataSource<T, K> {
  rows: T[];
  loading: boolean;
  paramsQuery: K;
  total: number;
}

export interface EntityPagination<T> {
  [name: string]: any;
  rows: T[];
  currentRow?: T | null;
  currentRowId?: string | null;
  limit?: number;
  page?: number;
  total?: number;
  search?: string | null;
  debounce?: number;
  isGet?: boolean;
  loading: boolean;
  loadingGetRow?: boolean;
  timeout?: any;
  after?: string | null;
  query?: any;
  sort?: any;
}

export interface EntityResult<T> {
  statusCode: number;
  statusText: string;
  subStatus: string;
  subStatusText: string;
  message: string;
  refToken?: string;
  total: number;
  data: T;
  viewer?: User;
  meta?: IMetaData;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  province?: string;
  district?: string;
  ward?: string;
  street?: string;
  address?: string;
  avatar: string;
  gender?: string;
  birthday?: string;
  role: string;
  createdAt?: Date;
}

export interface IMetaData {
  totalItems: number;
  totalPages: number;
  countRows: number;
  currentPage: number;
  pageSize: number;
}

export interface AccountPublic {
  id: string;
  fullName: string;
  email: string;
  role: string;
  roleIds: string[];
  isActive: boolean;
  avatar: string;
  createdAt: string;
  isFollowReport?: boolean;
  phone?: string;
}

export interface IQueryBase {
  'limit'?: number;
  'page'?: number;
  'before'?: Date;
  'after'?: Date;
  'q'?: string;
  'filter'?: any;
  'sort'?: string;
  'searchFields[]'?: string[];
  [name: string]: any;
}

export interface IPageChange {
  page?: number;
  limit: number;
}

export interface BaseInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: AccountPublic;
  updatedBy?: AccountPublic;
}

export interface ISidebar {
  link: string;
  name: string;
  icon?: string;
  iconActive?: string;
  isActive: boolean;
  children?: ISidebar[];
  disabled?: boolean;
  alias?: string;
}

export enum ESiteModule {
  ACCOUNT_MANAGEMENT = 'account-management',
  STAFF_CENTER = 'staff-center',
  ADMIN_STATION = 'admin-station',
  MANAGEMENT = 'management',
  STATION_MANAGEMENT = 'station-management',
  GROUP_MANAGEMENT = 'group-management',
  REGISTERED_PASSENGER_MANAGEMENT = 'registered-passenger-management',
  IO_CATEGORY_MANAGEMENT = 'io-category-management',
  SUPERVISE_SYSTEM_STATUS = 'supervise-system-status',
  SUPERVISE_SYNC_STATION = 'supervise-sync-station',
  SETTINGS = 'settings',
  HISTORY_STAFF = 'history-staff',
}
