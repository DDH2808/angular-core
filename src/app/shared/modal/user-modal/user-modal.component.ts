import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {
  CreateUserDto,
  ERole,
  EStatus,
  UpdateUserDto,
  UserEntity,
  UserService,
} from '@app/services/api/user.service';
import {CommonService} from '@app/services/common/common.service';
import {finalize, Subject, takeUntil} from 'rxjs';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {FormLargeSizeDirective} from '@app/shared/directive/default-input-size.directive';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    FormLargeSizeDirective,
  ],
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit, OnDestroy {
  user?: UserEntity;
  ERole = ERole;
  EStatus = EStatus;
  passwordVisible = false;
  isSubmitting = false;

  public form = this.fb.group({
    username: [null as string | null, [Validators.required]],
    fullName: [null as string | null, [Validators.required]],
    password: [null as string | null],
    role: [ERole.Admin, [Validators.required]],
    status: [EStatus.ACTIVE, [Validators.required]],
  });

  private destroy$ = new Subject<void>();

  constructor(
    private modal: NzModalRef,
    private readonly userService: UserService,
    private readonly commonService: CommonService,
    private readonly fb: FormBuilder,
  ) {
    this.user = this.modal.getConfig().nzData?.user;
  }

  ngOnInit(): void {
    const passwordControl = this.form.get('password');
    if (passwordControl) {
      const validators = this.user
        ? []
        : [Validators.required, Validators.minLength(6)];
      passwordControl.setValidators(validators);
      passwordControl.updateValueAndValidity();
    }

    if (this.user) {
      this.form.patchValue({
        username: this.user.username ?? null,
        fullName: this.user.fullName ?? null,
        password: null,
        role: this.user.role,
        status: this.user.status,
      });
    }
  }

  onCancel(): void {
    this.modal.close(null);
  }

  onSave(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    this.isSubmitting = true;
    const formData = this.form.value as UpdateUserDto;
    const userId = this.user?.id?.toString();

    const request$ = userId
      ? this.userService.user.updateRecord(userId, formData)
      : this.userService.user.createUser(formData as CreateUserDto);

    request$
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isSubmitting = false)),
      )
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            const actionType = userId ? 'update' : 'create';
            this.commonService.handleResSuccess(actionType);
            this.modal.close(res);
          } else {
            this.commonService.handleResErr(res);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
