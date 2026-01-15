import {Pipe, type PipeTransform} from '@angular/core';

export const EVENT_TYPES: Record<string, string> = {
  MATCH_PASS_FACE_A72: 'Trùng mặt ĐTNV',
  MATCH_PASS_A72: 'Trùng thông tin ĐTNV',
  MATCH_PAPER_A72: 'Trùng thông tin GTKHL',
  REGIS_FACE_DONT_MATCH: 'Đăng ký khuôn mặt không khớp giấy tờ',
  REGIS_FACE_EXISTED: 'Đăng ký khuôn mặt đã tồn tại',
  REGIS_FINGER_EXISTED: 'Đăng ký vân tay đã tồn tại',
  GO_BACK_OVER_DAY: 'Quá thời hạn lưu trú',
  TRANS_TWICE_IN_A_ROW: 'Hai lần xuất/nhập cảnh liên tiếp',
  TRANS_PASS_HAS_NOTICE: 'Hành khách có trường ghi chú',
  RESET_LANE: 'Đặt lại làn',
  SUSPEND_LANE: 'Tạm dừng làn',
};

@Pipe({
  name: 'eventTypeLabel',
  pure: true,
})
export class EventTypePipe implements PipeTransform {
  transform(eventType: string | null | undefined): string {
    if (!eventType) return 'Không xác định';
    return EVENT_TYPES[eventType] || 'Không xác định';
  }
}
