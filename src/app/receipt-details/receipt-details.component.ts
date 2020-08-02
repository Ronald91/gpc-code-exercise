import {
  Component,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Item } from '../interfaces/cart-item';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrls: ['./receipt-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceiptDetailsComponent implements OnInit, OnChanges {
  @Input() items: Item[];
  itemsToDisplay: any[];
  salesTaxes: number | string;
  total: number | string;

  constructor() {}

  renderOutput(): void {
    if (this.items) {
      const taxesArr = this.items.map((elem) => {
        return elem.taxes;
      });
      const pricesArr = this.items.map((elem) => {
        return elem.price;
      });
      this.salesTaxes = taxesArr.reduce((accum, current) => {
        return accum + current;
      });

      this.salesTaxes = this.salesTaxes.toFixed(2);

      this.total = pricesArr.reduce((accum, current) => {
        return accum + current;
      });
      this.total = this.total.toFixed(2);

      this.itemsToDisplay = this.items.map((elem) => {
        const displayObject = {
          quantity: elem.quantity,
          description: elem.description,
          price: elem.price.toFixed(2),
        };
        return displayObject;
      });
    }
  }

  ngOnInit(): void {
    this.renderOutput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderOutput();
  }
}
