import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import {BsDatepickerConfig, BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';

@Component({
  selector: 'custom-date-time-picker',
  templateUrl: './custom-date-time-picker.component.html',
  styleUrls: ['./custom-date-time-picker.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    TimepickerModule,
    FormsModule,
  ],
})
export class CustomDateTimePickerComponent implements OnInit, OnChanges {
  @Input() valueBinding?: Date;
  @Input() className = '';
  @Input() format = 'DD-MM-YYYY';
  @Input() placeholder = 'Date picker';
  @Output() changeDateEmmit = new EventEmitter<Date>();
  @Input() maxDate?: string | Date | undefined;
  @Input() minDate?: string | Date | undefined;
  @Input() minTime: Date = new Date();
  @Input() maxTime?: Date | undefined;
  @Input() showClearButton?: boolean = false;
  @Input() isDisabled: boolean = true;

  protected modalRef?: BsModalRef;
  protected bsInlineValue = new Date();
  protected mytime: Date = new Date();

  constructor(private modalService: BsModalService) {}

  public bsConfig?: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD-MM-YYYY',
    showWeekNumbers: false,
    clearPosition: 'right',
    isDisabled: true,
  };
  protected valueInput: any = undefined;

  ngOnInit(): void {
    if (this.minDate) {
      this.bsConfig!.minDate =
        this.minDate !== 'today' ? new Date(this.minDate) : new Date();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const maxDate = changes['maxDate']?.currentValue;
    const minDate = changes['minDate']?.currentValue;
    if (maxDate) {
      this.bsConfig!.maxDate =
        maxDate !== 'today'
          ? new Date(changes['maxDate']?.currentValue)
          : new Date();
    }
    if (minDate) {
      this.bsConfig!.minDate =
        minDate !== 'today'
          ? new Date(changes['minDate']?.currentValue)
          : new Date();
    }
    if (changes['showClearButton']) {
      this.bsConfig!.showClearButton = this.showClearButton;
    }
    if (changes['format']) {
      this.bsConfig!.dateInputFormat = this.format;
    }
    if (changes['valueBinding'] && !!changes['valueBinding']?.currentValue) {
      this.handleRenderValue();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {class: 'modal-dialog-centered modal-date-time'}),
    );
  }

  onHideModal() {
    this.modalRef?.hide();
  }

  handleRenderValue() {
    if (this.valueBinding) {
      const date = new Date(this.valueBinding);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      this.valueInput = `${day}/${month}/${year} ${
        hours >= 10 ? hours : '0' + hours
      }:${minutes >= 10 ? minutes : '0' + minutes}`;
      this.bsInlineValue = new Date(this.valueBinding);
      this.mytime = new Date(this.valueBinding);
    }
  }

  handleConfirm() {
    const day = this.bsInlineValue.getDate();
    const month = this.bsInlineValue.getMonth() + 1;
    const year = this.bsInlineValue.getFullYear();
    const hours = this.mytime.getHours();
    const minutes = this.mytime.getMinutes();

    const date = new Date(`${month}/${day}/${year} ${hours}:${minutes}`);
    this.valueInput = `${day}/${month}/${year} ${
      hours >= 10 ? hours : '0' + hours
    }:${minutes >= 10 ? minutes : '0' + minutes}`;
    this.changeDateEmmit.emit(date);
    this.onHideModal();
  }

  handleChangeDate($event: Date) {
    this.bsInlineValue = $event;
  }
}
