import {Component, Input, OnInit} from '@angular/core';
import {
  EPromoGetYType,
  EPromotionType,
  IGift,
  OrderDiscountDto,
} from '@app/types/ecommerce';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class GiftsComponent implements OnInit {
  @Input() class?: string = '';
  @Input() discounts?: OrderDiscountDto[] = [];
  @Input() gifts?: IGift[] = [];

  protected readonly EPromotionType = EPromotionType;
  protected readonly EPromoGetYType = EPromoGetYType;

  constructor() {}

  ngOnInit() {}
}
