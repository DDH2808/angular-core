import {ERole} from '@app/services/api/user.service';
import {BaseInterface} from '@app/types/viewmodels';
export enum EGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface IUser extends BaseInterface {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  fullName?: string;
  gender?: EGender;
  role?: ERole;
  isVerified: boolean;
}

export interface UpdateMeDto extends Partial<Omit<IUser, 'id'>> {}

export enum EUserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MOD = 'MOD',
}

export interface IAuth {
  accessToken: string;
  refreshToken: string;
  user: IUser;
  [name: string]: any;
}

export interface IBodyAuth {
  email: string;
  password: string;
}

export interface IBodyUser {
  fullName: string;
}

export interface IBodyChangePass {
  newPassword: string;
  oldPassword: string;
}

export enum ETabAuth {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgotPass',
  RECOVER_PASSWORD = 'recoverPassword',
  VERIFY_OTP = 'verifyOtp',
}
