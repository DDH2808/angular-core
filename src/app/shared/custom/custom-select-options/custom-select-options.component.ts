import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {PaginatorModule} from 'primeng/paginator';
import {ReactiveFormsModule} from '@angular/forms';
import {EProductProp, ProductProp, ProductPropDto} from '@app/types/ecommerce';
import {EcommerceService} from '@app/services/api/ecommerce.service';
import {CommonService} from '@app/services/common/common.service';
import {CommonModule} from '@angular/common';
import cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-custom-select-options',
  standalone: true,
  imports: [NgSelectModule, PaginatorModule, ReactiveFormsModule, CommonModule],
  templateUrl: './custom-select-options.component.html',
  styleUrl: './custom-select-options.component.scss',
})
export class CustomSelectOptionsComponent implements OnChanges {
  @Input() items: any = [];
  @Input() bindLabel = 'name';
  @Input() bindValue = 'id';
  @Input() placeholder = 'Select item';
  @Input() disabled = false;
  @Input() value: string[] = [];
  @Input() type: EProductProp = EProductProp.OCCASION;
  @Input() allowAddNew: boolean = true;
  @Input() class: string = '';
  @Input() isMulti: boolean = true;

  @Output() changeValue = new EventEmitter<string[]>();
  @Output() addItemValue = new EventEmitter();
  @Output() updateSizeEvent = new EventEmitter<ProductProp>();
  @Output() removeItemEvent = new EventEmitter();

  public staticData: any[] = [];

  constructor(
    private readonly ecommerceService: EcommerceService,
    private readonly commonService: CommonService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.staticData = cloneDeep(this.items);
  }

  newItem = (name: string) => {
    const newData: ProductPropDto = {
      name: name,
      type: this.type,
    };
    return new Promise(async (resolve) => {
      const a = await this.ecommerceService.productProp
        .createDetail(newData)
        .toPromise();
      if (a?.statusCode === 200) {
        this.addItemValue.emit(a.data);
        resolve(a.data);
      } else {
        this.commonService.handleResErr(a);
      }
    });
  };

  onRemoveOption(item: any) {
    return new Promise(async (resolve, reject) => {
      const a = await this.ecommerceService.productProp
        .deleteDetail(item.id)
        .toPromise();
      if (a?.statusCode === 200) {
        this.items = [...this.items]?.filter((i: any) => i !== item);
        this.value = [...this.value]?.filter(
          (i: any) => i !== item[this.bindValue],
        );
        this.changeValue.emit(this.value);
        resolve(true);
      } else {
        this.commonService.handleResErr(a);
        reject(a);
      }
    });
  }

  onUpdateOption(item: any) {
    return new Promise(async (resolve, reject) => {
      const a = await this.ecommerceService.productProp
        .updateDetail(item.id, item)
        .toPromise();
      if (a?.statusCode === 200) {
        resolve(a.data);
      } else {
        this.commonService.handleResErr(a);
        reject(a);
      }
    });
  }

  async handleRemoveOption(item: ProductProp, event: any) {
    event.stopPropagation();
    const a = await this.onRemoveOption(item);
    if (a) {
      this.items = [...this.items]?.filter((i: any) => i !== item);
      this.value = [...this.value]?.filter(
        (i: any) => i !== item[this.bindValue as keyof ProductProp],
      );
      this.changeValue.emit(this.value);
      this.removeItemEvent.emit(item.id);
    }
  }

  handleEditOption(item: any, event: any) {
    event.stopPropagation();
    if (this.type !== EProductProp.ADVICE_SIZE) {
      item.isEdit = true;
    } else {
      this.updateSizeEvent.emit(item);
    }
  }

  handleCancelChange(item: any, event: any) {
    event.stopPropagation();
    item.isEdit = false;
    item.name = this.staticData.find((i: any) => i.id === item.id).name;
  }

  async handleSubmitChange(item: any, event: any) {
    event.stopPropagation();
    const a = (await this.onUpdateOption(item)) as any;
    if (a) {
      item.name = a.name;
      item.isEdit = false;
      this.changeValue.emit(this.value);
      // update in static data
      this.staticData = this.staticData.map((i: any) =>
        i.id === item.id ? a : i,
      );
    } else {
      this.handleCancelChange(item, event);
    }
  }

  handleCloseEvent(event: any) {
    this.items?.forEach((item: any) => {
      if (item.isEdit) {
        item.isEdit = false;
        item.name = this.staticData.find((i: any) => i.id === item.id).name;
      }
    });
  }

  handleChangeEvent(value: string[]) {
    this.changeValue.emit(this.value);
  }
}
