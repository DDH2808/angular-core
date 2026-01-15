import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Subject} from 'rxjs';
import {EIntegrationStatus} from '@app/types/ecommerce';

@Component({
  selector: 'custom-toast-notify',
  templateUrl: './custom-toast-notify.component.html',
  styleUrl: './custom-toast-notify.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class CustomToastNotifyComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input() showToast?: boolean = false;
  @Input() type?: string;
  @Output() clickButtonEvent = new EventEmitter();

  private destroy$ = new Subject<void>();

  ngOnInit(): void {}

  message: string = '';

  ngOnChanges() {
    switch (this.type) {
      case EIntegrationStatus.PROGRESSING:
        this.message = 'Đang import sản phẩm';
        break;
      case EIntegrationStatus.SUCCESS:
        this.message = 'Import sản phẩm thành công!';
        break;
      case EIntegrationStatus.ERROR:
        this.message = 'Import sản phẩm thất bại';
        break;
      default:
        this.message = '';
        break;
    }
  }

  protected readonly EIntegrationStatus = EIntegrationStatus;

  handleClickToast() {
    if (
      this.type === EIntegrationStatus.PROGRESSING ||
      this.type === EIntegrationStatus.SUCCESS
    ) {
      this.clickButtonEvent.emit();
    } else {
      this.showToast = false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
