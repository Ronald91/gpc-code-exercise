import { Injectable } from '@angular/core';
import { Item } from '../interfaces/cart-item';

const SALES_TAX = 0.1;
const IMPORT_TAX = 0.05;
const ROUND_UP = 0.05;

@Injectable({
  providedIn: 'root',
})
export class CalculateTaxesService {
  constructor() {}

  calculateTaxes(baseItems: Item[]): Item[] {
    let calculatedItems: Item[];
    calculatedItems = JSON.parse(JSON.stringify(baseItems));
    calculatedItems.map((element) => {
      element.taxes = 0;
      element.price = element.price * element.quantity;
      if (!element.exemptStatus) {
        element.taxes += element.price * SALES_TAX;
        element.taxes = Math.ceil(element.taxes / ROUND_UP) * ROUND_UP;
      }
      if (element.importStatus) {
        element.taxes += element.price * IMPORT_TAX;
        element.taxes = Math.ceil(element.taxes / ROUND_UP) * ROUND_UP;
      }
      element.price += element.taxes;
    });
    return calculatedItems;
  }
}
