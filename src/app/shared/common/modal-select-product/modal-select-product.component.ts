import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  finalize,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {IBodyCollection, Product} from '@app/types/ecommerce';
import {EntityPagination} from '@app/types/viewmodels';
import {CustomModalComponent} from '@share/custom/custom-modal/custom-modal.component';
import {CustomInputSearchComponent} from '@share/custom/custom-input-search/custom-input-search.component';
import {CommonModule} from '@angular/common';
import {FallbackImageModule} from '@share/directive/fallback-image/fallback-image.module';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {EcommerceService} from '@app/services/api/ecommerce.service';
import {CommonService} from '@app/services/common/common.service';

@Component({
  selector: 'app-modal-select-product',
  standalone: true,
  imports: [
    CustomModalComponent,
    ReactiveFormsModule,
    CustomInputSearchComponent,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CommonModule,
    FallbackImageModule,
    TooltipModule,
    CdkVirtualForOf,
  ],
  templateUrl: './modal-select-product.component.html',
  styleUrl: './modal-select-product.component.scss',
})
export class ModalSelectProductComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  @Input() collectionId?: string;
  @Input() selectedProducts?: Product[] = [];
  @Output() selectedProductsChange = new EventEmitter<Product[]>();
  @Output() successEvent = new EventEmitter();

  public selectedProductIds: string[] = [];
  public dataSource: EntityPagination<Product> = {
    rows: [],
    loading: false,
  };

  public loading = {
    submit: false,
  };

  protected limit = 20;
  private theEnd = false;

  protected offset = new BehaviorSubject(1);
  private textSearch = new BehaviorSubject<string | undefined>(undefined);

  private destroy$ = new Subject<void>();

  public submitted = false;
  public form = this.fb.group({
    customers: [null],
  });

  constructor(
    private readonly modalRef: BsModalRef,
    private readonly fb: FormBuilder,
    private readonly ecommerceService: EcommerceService,
    private readonly commonService: CommonService,
  ) {}

  get f(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }

  ngOnInit() {
    this.offset
      ?.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.getDataProducts(res);
        }
      });
    this.textSearch
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data !== undefined) {
          this.getDataProducts(1, true);
        }
      });
    if (this.selectedProducts?.length) {
      this.selectedProductIds = this.selectedProducts.map(
        (product) => product.id,
      );
    }
  }

  getDataProducts(offset: any, isReset: boolean = false) {
    this.dataSource.loading = true;
    if (isReset) {
      this.dataSource.rows = [];
    }
    this.ecommerceService.product
      .get({
        page: offset,
        limit: this.limit,
        q: this.textSearch.value,
        sort: '-createdAt',
      })
      .pipe(
        tap((res) => (res.data.length ? null : (this.theEnd = true))),
        finalize(() => (this.dataSource.loading = false)),
        takeUntil(this.destroy$),
      )
      .subscribe((res) => {
        this.dataSource.rows = this.dataSource.rows.concat([...res.data]);
      });
  }

  onSubmit(): void {
    try {
      this.submitted = true;
      if (this.form.valid) {
        if (!this.collectionId) {
          this.selectedProductsChange.emit(this.selectedProducts);
          return;
        } else {
          this.loading.submit = true;
          this.ecommerceService.collection
            .updateRecord(this.collectionId, {
              manualProductIds: this.selectedProductIds,
            } as unknown as IBodyCollection)
            .pipe(
              finalize(() => (this.loading.submit = false)),
              takeUntil(this.destroy$),
            )
            .subscribe({
              next: (res) => {
                if (res.statusCode === 200) {
                  this.commonService.handleResSuccess('update');
                  this.successEvent.emit();
                } else {
                  this.commonService.handleResErr(res);
                }
              },
            });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  onSearchProduct(value: string) {
    this.textSearch.next(value);
  }

  nextBatch(e: any, offset: number) {
    if (this.theEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) {
      this.offset.next(offset);
    }
  }

  selectProduct(item: Product) {
    try {
      if (this.selectedProducts?.some((product) => product.id === item.id)) {
        this.removeProduct(item.id);
        return;
      }
      this.selectedProducts = [...(this.selectedProducts || []), item];
      this.selectedProductIds = [...this.selectedProductIds, item.id];
    } catch (e) {
      console.log(e);
    }
  }

  removeProduct(id: string) {
    this.selectedProducts = this.selectedProducts?.filter(
      (product) => product.id !== id,
    );
    this.selectedProductIds = this.selectedProductIds.filter((i) => i !== id);
  }

  trackByIdx(i: any) {
    return i;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
