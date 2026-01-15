import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {EntityResult} from '@app/types/viewmodels';
import {HttpErrorResponse} from '@angular/common/http';
import {SUB_STATUS_ERROR} from '@app/types/constant';
import {AuthService} from '@app/services/api/auth.service';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class CommonService implements OnDestroy {
  public destroy = new Subject();
  public listBreadcrumb$ = new BehaviorSubject<string[]>([]);
  public defaultBreadcrumb = '';

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private readonly authService: AuthService,
    private titleService: Title,
  ) {}

  handleResErr<T>(response?: EntityResult<T>, alias?: string) {
    if (!response) {
      this.toastr.error('Đã có lỗi xảy ra!');
      return;
    }
    if ([401].includes(response.statusCode)) {
      this.authService.logout();
      this.router.navigate(['/auth']);
      return;
    }
    if (SUB_STATUS_ERROR[response.subStatus]) {
      if (response.subStatus === 'JWT.TOKEN_EXPIRED') {
        this.toastr.error(
          'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!',
        );
        this.authService.logout();
        return;
      }
      this.toastr.error(SUB_STATUS_ERROR[response.subStatus]);
      return;
    }
    if ([400, 409, 413, 500].includes(response.statusCode)) {
      const text = response.message;
      if (!!text) {
        this.toastr.error(text);
      } else {
        this.toastr.error('Đã có lỗi xảy ra! Vui lòng thử lại sau.');
      }
    } else if ([404].includes(response.statusCode)) {
      this.toastr.error('Không tìm thấy kết quả!');
    } else if ([403].includes(response.statusCode)) {
      this.toastr.error('Bạn không có quyền!');
    } else {
      this.toastr.error('Đã có lỗi xảy ra!');
    }
  }

  handleErr(response: HttpErrorResponse) {
    if ([400, 404, 409].includes(response.status)) {
      let text = response.name;
      if (response.error && typeof response.error === 'object') {
        if (response.error.error)
          text = response.error.error.message || response.error.error;
        if (response.error.message) text = response.error.message;
      } else if (typeof response.error === 'string') {
        text = response.error;
      }
      this.toastr.error(text);
    } else if (response.status === 413) {
      this.toastr.error('File quá lớn!');
    } else if ([401].includes(response.status)) {
      // this.toastr.error('Unauthorized error')
      this.router.navigate(['/auth']);
    } else if ([500].includes(response.status)) {
      this.toastr.error('Mất kết nối với máy chủ, vui lòng thử lại sau!');
    } else if ([403].includes(response.status)) {
      let text = 'You do not have permission';
      if (response.error) {
        if (response.error.error && response.error.error.message) {
          text = response.error.error.message;
        }
        if (response.error.message) {
          text = response.error.message;
        }
      } else if (typeof response.error === 'string') {
        text = response.error;
      }
      this.toastr.error(text);
    } else {
      this.toastr.error(response.statusText);
    }
  }

  handleResSuccess(
    action?:
      | 'get'
      | 'update'
      | 'delete'
      | 'create'
      | 'clone'
      | 'login'
      | 'register'
      | 'forgotPass'
      | 'recoverPassword'
      | 'verifyOtp'
      | 'upload'
      | 'duplicate',
    text?: string,
  ) {
    if (text) {
      this.toastr.success(text);
      return;
    }
    switch (action) {
      case 'get':
        this.toastr.success('Lấy dữ liệu thành công!');
        break;
      case 'update':
        this.toastr.success('Cập nhật thành công!');
        break;
      case 'delete':
        this.toastr.success('Xóa thành công!');
        break;
      case 'create':
        this.toastr.success('Tạo mới thành công!');
        break;
      case 'clone':
        this.toastr.success('Sao chép thành công!');
        break;
      case 'login':
        this.toastr.success('Đăng nhập thành công!');
        break;
      case 'register':
        this.toastr.success('Đăng ký thành công!');
        break;
      case 'forgotPass':
        this.toastr.success(
          'Gửi email thành công. Vui lòng kiểm tra hòm thư của bạn!',
        );
        break;
      case 'recoverPassword':
        this.toastr.success('Khôi phục mật khẩu thành công!');
        break;
      case 'verifyOtp':
        this.toastr.success('Xác thực mã OTP thành công!');
        break;
      case 'upload':
        this.toastr.success('Tải lên thành công!');
        break;
      default:
        this.toastr.success('Thành công');
    }
  }

  pushBreadcrumb(breadcrumb?: string) {
    if (!breadcrumb) {
      return this.listBreadcrumb$.next([this.defaultBreadcrumb]);
    }
    this.listBreadcrumb$.next([this.defaultBreadcrumb, breadcrumb]);
  }

  copyText(text: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success('Sao chép thành công!');
  }

  removeCharacter(str: string): string {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  }

  scrollToFirstInvalidControl() {
    let form = document.getElementById('formId');
    let firstInvalidControl = form?.getElementsByClassName('is-invalid')?.[0];
    !!firstInvalidControl &&
      firstInvalidControl?.scrollIntoView({
        behavior: 'smooth',
      });
    (firstInvalidControl as HTMLElement)?.focus();
  }

  handleClickPTree(event: any) {
    event.preventDefault();
    try {
      const node = event.target;
      if (node.tagName === 'SPAN') {
        const parent = node?.parentNode?.parentNode;
        if (parent) {
          Array.from(parent?.children)?.forEach((item: any) => {
            if (item.tagName === 'BUTTON') {
              item.click();
            }
          });
        }
      } else {
        Array.from(node?.children)?.forEach((item: any) => {
          if (item.tagName === 'BUTTON') {
            item.click();
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  setTitlePage(title: string) {
    this.titleService.setTitle(title);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
