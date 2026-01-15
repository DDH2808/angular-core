import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-base-radio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './base-radio.component.html',
  styleUrl: './base-radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseRadioComponent),
      multi: true,
    },
  ],
})
export class BaseRadioComponent {
  @Input() class: string = '';
  @Input() withoutLabel: boolean = false;
  @Input() id: string = 'radio';
  @Input() name: string = 'radio';
  @Input() label: string = '';
  @Input() value: any;
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Output() checkedChange = new EventEmitter<{
    checked: boolean;
    value: any;
  }>();

  protected selectedValue: any;

  protected onChange = (value: any) => {
    this.checkedChange.emit({checked: this.checked, value});
  };
  protected onTouched = () => {};

  constructor() {}

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
