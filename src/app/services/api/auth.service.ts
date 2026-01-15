import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EntityResult} from '@app/types/viewmodels';
import {
  EUserRole,
  IAuth,
  IBodyAuth,
  IBodyChangePass,
  IUser,
  UpdateMeDto,
} from '@app/types/auth';
import {BaseApiService} from '@app/services/api/base.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService {
  public tokenKey = 'primev_token';
  public api = {
    auth: 'auth',
    login: 'login',
    register: 'register',
    forgotPassword: 'forgot-password',
    recoverPassword: 'recover-password',
    user: 'users',
    changePass: 'change-password',
    verifyOtp: 'verify-otp',
  };

  public broadcastChannel = new BroadcastChannel('AngularCore');

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private currentUserSubject = new BehaviorSubject<IUser | undefined>(
    undefined,
  );
  public currentUser$ = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getToken(name = this.tokenKey): string {
    const token = localStorage.getItem(name);
    return token || '';
  }

  setToken(token: string, name = this.tokenKey) {
    localStorage.setItem(name, token);
  }

  setUser(user?: IUser) {
    this.currentUserSubject.next(user);
  }

  getUser(): any | undefined {
    return this.currentUserSubject.getValue();
  }

  isAdministrator(): boolean {
    const user = this.getUser();
    return user?.role === EUserRole.ADMIN || user?.role === EUserRole.MOD;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === EUserRole.ADMIN;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    const parsedURL = new URL(location.href);
    window.location.href = parsedURL.origin + '/auth';
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (this.tokenNotExpired(token)) {
      this.isLoggedInSubject.next(true);
    }
    return this.tokenNotExpired(token);
  }

  tokenNotExpired(token: string) {
    if (token) {
      const jwtHelper = new JwtHelperService();
      return !jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  getMe() {
    this.user.getMe().subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.setUser(res.data);
        }
      },
    });
  }

  auth = {
    login: (body: IBodyAuth) =>
      this.httpClient.post<EntityResult<IAuth>>(
        this.createUrl([this.api.auth, this.api.login]),
        body,
      ),
    get: (params: any = {}) =>
      this.httpClient.get<EntityResult<IUser>>(
        this.createUrl([this.api.auth]),
        {
          params: this.createParams(params),
        },
      ),
    create: (body: IBodyAuth) =>
      this.httpClient.post<EntityResult<IUser>>(
        this.createUrl([this.api.auth, this.api.register]),
        body,
      ),
    forgotPassword: (body: {email: string}) =>
      this.httpClient.post<EntityResult<IUser>>(
        this.createUrl([this.api.auth, this.api.forgotPassword]),
        body,
      ),
    recoverPassword: (body: {
      email: string;
      newPassword: string;
      otp: string;
    }) =>
      this.httpClient.post<EntityResult<IUser>>(
        this.createUrl([this.api.auth, this.api.recoverPassword]),
        body,
      ),
    verifyOtp: (body: {email: string; otp: string}) =>
      this.httpClient.post<EntityResult<IUser>>(
        this.createUrl([this.api.auth, this.api.verifyOtp]),
        body,
      ),
    update: (id: string, body: IBodyAuth) =>
      this.httpClient.patch<EntityResult<IUser>>(this.createUrl([id]), body),
    delete: (id: string) =>
      this.httpClient.delete<EntityResult<IUser>>(this.createUrl([id])),
  };

  user = {
    getMe: () =>
      this.httpClient.get<EntityResult<IUser>>(
        this.createUrl([this.api.user, 'me']),
      ),
    changePassword: (body: IBodyChangePass) =>
      this.httpClient.post<EntityResult<IUser>>(
        this.createUrl([this.api.user, this.api.changePass]),
        body,
      ),
    setAvatar: (body: {file: any}) => {
      const formData = new FormData();
      formData.append('file', body.file);
      return this.httpClient.patch<EntityResult<IUser>>(
        this.createUrl([this.api.user, 'set-avatar']),
        formData,
      );
    },
    update: (body: UpdateMeDto) =>
      this.httpClient.patch<EntityResult<IUser>>(
        this.createUrl([this.api.user, 'me']),
        body,
      ),
    delete: (id: string) =>
      this.httpClient.delete<EntityResult<IUser>>(this.createUrl([id])),
    generateUiAvatar: (name: string) =>
      this.httpClient.get(`https://ui-avatars.com/api/?name=${name}`),
  };
}
