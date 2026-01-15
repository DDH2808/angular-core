import {EGender} from '@app/types/auth';

export const SUB_STATUS_ERROR: {[key: string]: string} = {
  'AUTH.USER_NOT_FOUND': 'Tài khoản không tồn tại',
  'AUTH.LOGIN_INCORRECT': 'Tài khoản hoặc mật khẩu không đúng',
  'EMAIL.EMAIL_OR_PASSWORD_INVALID': 'Email hoặc mật khẩu không đúng',
  'JWT.TOKEN_EXPIRED': 'Phiên đăng nhập đã hết hạn',
  'JWT.AUTH_FAIL': 'Xác thực không thành công',
  'USER.EMAIL_EXISTED': 'Tài khoản đã tồn tại',
  'USER.WRONG_OLD_PASSWORD': 'Mật khẩu cũ không đúng',
  'USER.USERNAME_NOT_ALLOW': 'Tên tài khoản không hợp lệ',
  'USER.EMAIL_BLOCKED': 'Tài khoản đã bị khóa',
  'PERMISSION.INSUFFICIENT_AUTHORITY': 'Không đủ quyền truy cập',
  'PERMISSION.INSUFFICIENT_SYSTEM_ROLE': 'Không đủ quyền truy cập',
  'PRODUCT.IDS_NOT_EXIST': 'Sản phẩm không tồn tại',
  'PRODUCT.ID_NOT_EXIST': 'Sản phẩm không tồn tại',
  'PRODUCT.SKU_DUPLICATED': 'Mã SKU đã tồn tại',
  'COLLECTION.IDS_NOT_EXIST': 'Bộ sưu tập không tồn tại',
  'COLLECTION.ID_NOT_EXIST': 'Bộ sưu tập không tồn tại',
  'CART.PRODUCT_NOT_FOUND': 'Sản phẩm không tồn tại',
  'ORDER.IDS_NOT_EXIST': 'Đơn hàng không tồn tại',
  'ORDER.ID_NOT_EXIST': 'Đơn hàng không tồn tại',
  'PROMOTION.ID_NOT_EXIST': 'Khuyến mãi không tồn tại',
  'PROMOTION.IDS_NOT_EXIST': 'Khuyến mãi không tồn tại',
  'AUTH.OTP_FAIL': 'Mã OTP không đúng',
  'PROMOTION.CODE_EXISTED': 'Mã khuyến mãi đã tồn tại',
  'PROMOTION.CODE_NOT_EXIST': 'Mã khuyến mãi không tồn tại',
  'UPLOAD.IN_CORRECT_FILE_FORMAT': 'File không đúng định dạng',
  'UPLOAD.PAYLOAD_TOO_LARGE': 'File quá lớn',
  'AI_KNOWLEDGE.UPDATE_API_ERROR': 'Lỗi kết nối với AI',
  'PRODUCT.SKU_EXISTED': 'Mã SKU đã tồn tại',
};

export const BANK_BRAND = [
  {
    name: 'Vietcombank',
    value: 'VIETCOMBANK',
  },
  {
    name: 'Techcombank',
    value: 'TECHCOMBANK',
  },
  {
    name: 'Vietinbank',
    value: 'VIETINBANK',
  },
  {
    name: 'BIDV',
    value: 'BIDV',
  },
  {
    name: 'Sacombank',
    value: 'SACOMBANK',
  },
  {
    name: 'ACB',
    value: 'ACB',
  },
  {
    name: 'VPBank',
    value: 'VPBANK',
  },
  {
    name: 'MBBank',
    value: 'MBBANK',
  },
  {
    name: 'Agribank',
    value: 'AGRIBANK',
  },
  {
    name: 'VietABank',
    value: 'VIETABANK',
  },
  {
    name: 'OceanBank',
    value: 'OCEANBANK',
  },
  {
    name: 'DongABank',
    value: 'DONGABANK',
  },
  {
    name: 'Eximbank',
    value: 'EXIMBANK',
  },
  {
    name: 'HDBank',
    value: 'HDBANK',
  },
  {
    name: 'SHB',
    value: 'SHB',
  },
  {
    name: 'TPBank',
    value: 'TPBANK',
  },
  {
    name: 'MSB',
    value: 'MSB',
  },
  {
    name: 'BacABank',
    value: 'BACABANK',
  },
  {
    name: 'NamABank',
    value: 'NAMABANK',
  },
  {
    name: 'VIB',
    value: 'VIB',
  },
  {
    name: 'PVcomBank',
    value: 'PVCOMBANK',
  },
  {
    name: 'LienVietPostBank',
    value: 'LIENVIETPOSTBANK',
  },
  {
    name: 'BaoVietBank',
    value: 'BAOVIETBANK',
  },
  {
    name: 'VietCapitalBank',
    value: 'VIETCAPITALBANK',
  },
  {
    name: 'VietBank',
    value: 'VIETBANK',
  },
  {
    name: 'KienLongBank',
    value: 'KIENLONGBANK',
  },
];

export const GENDERS = [
  {
    label: 'Nam',
    value: EGender.MALE,
  },
  {
    label: 'Nữ',
    value: EGender.FEMALE,
  },
  {
    label: 'Khác',
    value: EGender.OTHER,
  },
];

export const LIST_PROMOTION_CUSTOMER_CONDITION = [
  {
    label: 'Tất cả khách hàng',
    value: true,
  },
  {
    label: 'Khách hàng cụ thể',
    value: false,
  },
];

export const ORDER_QUANTITY_OPTIONS = [
  {
    value: 'lt100',
    label: 'Dưới 100 đơn',
  },
  {
    value: '100-500',
    label: '100 - 500 đơn',
  },
  {
    value: '500-1000',
    label: '500 - 1000 đơn',
  },
  {
    value: 'gt1000',
    label: 'Trên 1000 đơn',
  },
];

export const STAFF_QUANTITY_OPTIONS = [
  {
    value: '1-5',
    label: '1 - 5 nhân viên',
  },
  {
    value: '5-10',
    label: '5 - 10 nhân viên',
  },
  {
    value: '10-15',
    label: '10 - 15 nhân viên',
  },
  {
    value: '15-20',
    label: '15 - 20 nhân viên',
  },
  {
    value: 'gt20',
    label: 'Trên 20 nhân viên',
  },
];

export const CONVERT_RATE_OPTIONS = [
  {
    value: 'lt5',
    label: 'Dưới 5%',
  },
  {
    value: '5-10',
    label: '5% - 10%',
  },
  {
    value: '15-20',
    label: '15% - 20%',
  },
  {
    value: '20-25',
    label: '20% - 25%',
  },
  {
    value: 'gt25',
    label: 'Trên 25%',
  },
];

export const RANGE_TIME = [
  {
    value: [
      new Date(new Date().setMonth(new Date().getMonth() - 3)),
      new Date(),
    ],
    label: '3 tháng trước',
  },
  {
    value: [
      new Date(new Date().setDate(new Date().getDate() - 30)),
      new Date(),
    ],
    label: '30 ngày trước',
  },
  {
    value: [
      new Date(new Date().setDate(new Date().getDate() - 15)),
      new Date(),
    ],
    label: '15 ngày trước',
  },
  {
    value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
    label: '7 ngày trước',
  },
  {
    value: [new Date(new Date()), new Date()],
    label: 'Hôm nay',
  },
];

export enum EBroadcastWebMessage {
  NEW_LOGIN = 'NEW_LOGIN',
}
