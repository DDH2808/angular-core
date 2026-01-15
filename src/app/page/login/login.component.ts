import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, map, Subject, takeUntil, takeWhile, timer} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@app/services/api/auth.service';
import {ETabAuth, IBodyAuth} from '@app/types/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '@app/services/common/common.service';
import {TranslocoService} from '@jsverse/transloco';
import {EBroadcastWebMessage} from '@app/types/constant';

const TIME_REMAINING = 300;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  protected activeTab: ETabAuth = ETabAuth.LOGIN;
  public submitted = false;
  public loading = {submit: false};

  public language: string = 'vi';
  public languages = [
    {label: 'Việt Nam', value: 'vi'},
    {label: 'English', value: 'en'},
  ];

  public timeRemaining$ = timer(0, 1000).pipe(
    map((n) => (TIME_REMAINING - n) * 1000),
    takeWhile((n) => n >= 0),
  );

  // Separate forms for each tab
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public forgotPasswordForm: FormGroup;
  public recoverPasswordForm: FormGroup;
  public verifyOtpForm: FormGroup;

  public passwordVisible = false;
  public rePasswordVisible = false;
  public newPasswordVisible = false;
  protected readonly ETabAuth = ETabAuth;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private translate: TranslocoService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(12)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });

    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(255)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(255)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      rePassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });

    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(255)],
      ],
    });

    this.recoverPasswordForm = this.fb.group({
      otp: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });

    this.verifyOtpForm = this.fb.group({
      otp: ['', [Validators.required]],
    });

    this.authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/']);
        }
      });

    this.initForms();
  }

  /** Initialize forms for each tab */
  private initForms(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(12)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });

    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.maxLength(255)]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(255)],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ],
        ],
        rePassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ],
        ],
      },
      {validators: this.passwordMatchValidator},
    );

    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(255)],
      ],
    });

    this.recoverPasswordForm = this.fb.group({
      otp: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });

    this.verifyOtpForm = this.fb.group({
      otp: ['', [Validators.required]],
    });
  }

  /** Custom validator to check if passwords match */
  private passwordMatchValidator(form: FormGroup): void {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword');
    if (password !== rePassword?.value) {
      rePassword?.setErrors({notMatch: true});
    } else {
      rePassword?.setErrors(null);
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const tab = params.get('tab') as ETabAuth | null;
        if (!tab || !Object.values(ETabAuth).includes(tab)) {
          this.handleRedirectType(ETabAuth.LOGIN);
        } else if (
          tab === ETabAuth.VERIFY_OTP &&
          !this.registerForm?.get('email')?.value
        ) {
          this.handleRedirectType(ETabAuth.LOGIN);
        } else {
          this.activeTab = tab;
          this.handleRedirectType(tab);
        }
      });
  }

  getActiveForm(): FormGroup {
    switch (this.activeTab) {
      case ETabAuth.LOGIN:
        return this.loginForm;
      case ETabAuth.REGISTER:
        return this.registerForm;
      case ETabAuth.FORGOT_PASSWORD:
        return this.forgotPasswordForm;
      case ETabAuth.RECOVER_PASSWORD:
        return this.recoverPasswordForm;
      case ETabAuth.VERIFY_OTP:
        return this.verifyOtpForm;
      default:
        return this.loginForm;
    }
  }

  /** Handle form submission based on active tab */
  onSubmit(): void {
    this.submitted = true;

    const currentForm = this.getActiveForm();

    if (currentForm.invalid) {
      Object.values(currentForm.controls).forEach((control) => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      return;
    }

    switch (this.activeTab) {
      case ETabAuth.LOGIN:
        this.handleLogin();
        break;
      case ETabAuth.REGISTER:
        this.handleRegister();
        break;
      case ETabAuth.FORGOT_PASSWORD:
        this.handleForgotPass();
        break;
      case ETabAuth.RECOVER_PASSWORD:
        this.handleRecoverPassword();
        break;
      case ETabAuth.VERIFY_OTP:
        this.handleVerifyOtp();
        break;
    }
  }

  /** Handle login submission */
  private handleLogin(): void {
    if (this.loginForm.invalid) return;
    this.loading.submit = true;
    const body = this.loginForm.value as IBodyAuth;
    this.authService.auth
      .login(body)
      .pipe(
        finalize(() => (this.loading.submit = false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.authService.broadcastChannel.postMessage(
              EBroadcastWebMessage.NEW_LOGIN,
            );
            this.authService.setToken(res.data.accessToken);
            this.authService.setUser(res.data.user);
            this.commonService.handleResSuccess('login');
            this.router.navigate(['/']);
          } else {
            this.commonService.handleResErr(res);
          }
        },
      });
  }

  /** Handle registration submission */
  public handleRegister(resend?: boolean): void {
    const currentForm = this.getActiveForm();
    if (currentForm.invalid) return;

    if (resend) this.resetTimer();
    this.loading.submit = true;
    const body = this.registerForm.value as IBodyAuth;
    this.authService.auth
      .create(body)
      .pipe(
        finalize(() => (this.loading.submit = false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.handleRedirectType(ETabAuth.VERIFY_OTP);
          } else {
            this.commonService.handleResErr(res);
          }
        },
      });
  }

  public handleForgotPass(resend?: boolean): void {
    const currentForm = this.getActiveForm();
    if (currentForm.invalid) return;

    if (resend) this.resetTimer();
    this.loading.submit = true;
    const body = this.forgotPasswordForm.value;
    this.authService.auth
      .forgotPassword(body)
      .pipe(
        finalize(() => (this.loading.submit = false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            if (!resend) this.handleRedirectType(ETabAuth.RECOVER_PASSWORD);
            this.commonService.handleResSuccess('forgotPass');
          } else {
            this.commonService.handleResErr(res);
          }
        },
      });
  }

  /** Handle password recovery submission */
  private handleRecoverPassword(): void {
    const currentForm = this.getActiveForm();
    if (currentForm.invalid) return;

    this.loading.submit = true;
    const body = {
      email: this.forgotPasswordForm.get('email')?.value,
      ...this.recoverPasswordForm.value,
    };
    this.authService.auth
      .recoverPassword(body)
      .pipe(
        finalize(() => (this.loading.submit = false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.handleRedirectType(ETabAuth.LOGIN);
            this.commonService.handleResSuccess('recoverPassword');
          } else {
            this.commonService.handleResErr(res);
          }
        },
      });
  }

  /** Handle OTP verification submission */
  private handleVerifyOtp(): void {
    const currentForm = this.getActiveForm();
    if (currentForm.invalid) return;

    this.loading.submit = true;
    const body = {
      email: this.registerForm.get('email')?.value,
      ...this.verifyOtpForm.value,
    };
    this.authService.auth
      .verifyOtp(body)
      .pipe(
        finalize(() => (this.loading.submit = false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.handleRedirectType(ETabAuth.LOGIN);
            this.commonService.handleResSuccess('register');
          } else {
            this.commonService.handleResErr(res);
          }
        },
      });
  }

  /** Reset OTP timer */
  private resetTimer(): void {
    this.timeRemaining$ = timer(0, 1000).pipe(
      map((n) => (TIME_REMAINING - n) * 1000),
      takeWhile((n) => n >= 0),
    );
  }

  /** Redirect to a specific tab */
  handleRedirectType(type: ETabAuth): void {
    this.submitted = false;
    this.activeTab = type;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {tab: type},
      queryParamsHandling: 'merge',
    });
  }

  /** Change language */
  handleChangeLanguage(lang: string): void {
    this.language = lang;
    this.translate.setActiveLang(lang);
    localStorage.setItem('language', lang);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
