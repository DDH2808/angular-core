import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'custom-button-loading',
  template: `
    <button
      (click)="onAction()"
      [type]="type"
      class="d-flex align-items-center justify-content-center input-size-sm {{
        className
      }}"
      [ngClass]="{loading: isLoading}"
      [disabled]="isDisabled"
      [id]="id"
      [style]="style"
    >
      <i *ngIf="icon" class="fa-solid {{ icon }} me-2"></i>
      <i *ngIf="isLoading" class="fa-solid fa-spinner fa-spin me-2"></i>
      <span>{{ textButton }}</span>
    </button>
  `,
  styleUrls: ['./custom-button-loading.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CustomButtonLoadingComponent implements OnInit {
  @Input() isLoading = false;
  @Input() isDisabled = false;
  @Input() type = 'button';
  @Input() textButton = 'Save';
  @Input() className?: string;
  @Input() id?: string;
  @Input() icon?: string;
  @Input() style?: object;
  @Output() action = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}

  onAction() {
    this.action.emit();
  }
}
