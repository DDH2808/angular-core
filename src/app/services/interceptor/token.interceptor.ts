import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, throwError, timeout} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ObjectAny} from '@app/types/viewmodels';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '@app/services/api/auth.service';
import {CommonService} from '@app/services/common/common.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService,
    private toastr: ToastrService,
    private readonly commonService: CommonService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const requestOption: any = {};

    if (this.auth.isAuthenticated()) {
      const defaultHeader: ObjectAny = {
        Authorization: `Bearer ${this.auth.getToken()}`,
      };
      requestOption.setHeaders = defaultHeader;
    }

    request = request.clone(requestOption);
    return next.handle(request).pipe(
      timeout({
        each: 20000,
        with: () =>
          throwError(() => this.toastr.error('Mất kết nối với máy chủ')),
      }),
      catchError((response, retry) => {
        this.commonService.handleErr(response);
        return throwError(response.error || response);
      }),
    );
  }

  private isUnauthorized(err: HttpErrorResponse) {
    return err.status === 401;
  }
}
