import {Directive, OnInit, Optional} from '@angular/core';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzTimePickerComponent} from 'ng-zorro-antd/time-picker';
import {NzCascaderComponent} from 'ng-zorro-antd/cascader';
import {NzMentionComponent} from 'ng-zorro-antd/mention';
import {NzTreeSelectComponent} from 'ng-zorro-antd/tree-select';

@Directive({
  selector: '[nz-form-large]',
  standalone: true,
})
export class FormLargeSizeDirective implements OnInit {
  constructor(
    @Optional() private nzInputDirective: NzInputDirective,
    @Optional() private nzInputGroup: NzInputGroupComponent,
    @Optional() private nzSelect: NzSelectComponent,
    @Optional() private nzDatePicker: NzDatePickerComponent,
    @Optional() private nzTimePicker: NzTimePickerComponent,
    @Optional() private nzCascader: NzCascaderComponent,
    @Optional() private nzMention: NzMentionComponent,
    @Optional() private nzTreeSelect: NzTreeSelectComponent,
  ) {}

  ngOnInit(): void {
    if (this.nzInputDirective) {
      this.nzInputDirective.nzSize = 'large';
    }

    if (this.nzInputGroup) {
      this.nzInputGroup.nzSize = 'large';
    }

    if (this.nzSelect) {
      this.nzSelect.nzSize = 'large';
    }

    if (this.nzDatePicker) {
      this.nzDatePicker.nzSize = 'large';
    }

    if (this.nzTimePicker) {
      this.nzTimePicker.nzSize = 'large';
    }

    if (this.nzCascader) {
      this.nzCascader.nzSize = 'large';
    }

    if (this.nzTreeSelect) {
      this.nzTreeSelect.nzSize = 'large';
    }
  }
}
