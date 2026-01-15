import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-base-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './base-checkbox.component.html',
  styleUrl: './base-checkbox.component.scss',
})
export class BaseCheckboxComponent {
  @Input() withoutLabel: boolean = false;
  @Input() name: string = 'checkbox';
  @Input() label: string = '';
  @Input() value: any;
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Output() checkedChange = new EventEmitter<{
    checked: boolean;
    value: any;
  }>();
}
