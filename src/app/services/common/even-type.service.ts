import {Injectable} from '@angular/core';

export interface DefaultOptionType {
  value: string;
  label: string;
}

export enum EActionType {
  ALLOW_REGISTRATION = 'ALLOW_REGISTRATION',
  ALLOW_TRANSPORT_ONCE = 'ALLOW_TRANSPORT_ONCE',
  ALLOW_TRANSPORT_SET_NOT_RESTRICT = 'ALLOW_TRANSPORT_SET_NOT_RESTRICT',
  REJECT_REGISTRATION = 'REJECT_REGISTRATION',
  REJECT_TRANSPORT = 'REJECT_TRANSPORT',
  RESET_LANE = 'RESET_LANE',
  SUSPEND_LANE = 'SUSPEND_LANE',
}

@Injectable({
  providedIn: 'root',
})
export class OfficerActionService {
  private officerActionOptions: DefaultOptionType[] = [
    {value: EActionType.ALLOW_REGISTRATION, label: 'Cho phép đăng ký'},
    {
      value: EActionType.ALLOW_TRANSPORT_ONCE,
      label: 'Cho phép di chuyển 1 lần',
    },
    {
      value: EActionType.ALLOW_TRANSPORT_SET_NOT_RESTRICT,
      label: 'Cho phép không phải ĐTNV',
    },
    {value: EActionType.REJECT_REGISTRATION, label: 'Từ chối đăng ký'},
    {value: EActionType.REJECT_TRANSPORT, label: 'Từ chối di chuyển'},
    {value: EActionType.RESET_LANE, label: 'Đặt lại làn'},
    {value: EActionType.SUSPEND_LANE, label: 'Dừng làn'},
  ];
  getOptions(): DefaultOptionType[] {
    return this.officerActionOptions;
  }

  getLabelByValue(value: string): string {
    const option = this.officerActionOptions.find(
      (item) => item.value === value,
    );
    return option?.label || '-';
  }

  constructor() {}
}
