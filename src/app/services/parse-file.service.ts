import { Injectable } from '@angular/core';
import { Item } from '../interfaces/cart-item';

@Injectable({
  providedIn: 'root',
})
export class ParseFileService {
  constructor() {}

  parseFileLines(filesLines: string[]): Item[] {
    const baseItems = filesLines.map((entry) => {
      const splitValues = entry.split(',');
      const baseItem = {
        quantity: parseInt(splitValues[0], 10),
        description: splitValues[1] || '',
        price: parseFloat(splitValues[2]),
        exemptStatus: splitValues[3] === 'Y' ? true : false,
        importStatus: splitValues[4] === 'Y' ? true : false,
      };
      return baseItem;
    });
    return baseItems;
  }
}
