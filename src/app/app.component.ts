import { Component } from '@angular/core';
import { Item } from './interfaces/cart-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gpc-code-exercise';
  taxedItems: Item[];
  storeTaxedItems(items): void {
    this.taxedItems = items;
  }
}
