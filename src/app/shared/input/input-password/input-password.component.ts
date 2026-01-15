import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [CommonModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
})
export class InputPasswordComponent implements OnInit, OnChanges {
  @Input() ngClass?: string;
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() value?: string | null = null;
  @Output() changeValue = new EventEmitter<string | null>();
  protected showPassword?: boolean;

  constructor() {}

  ngOnInit(): void {}

  handleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnChanges() {
    if (!this.value) {
      this.changeValue.emit(null);
    }
  }

  handleType(event: any) {
    const text = event.target.value;
    this.changeValue.emit(text);
  }
}
