import { TestBed } from '@angular/core/testing';

import { CalculateTaxesService } from './calculate-taxes.service';

const VALID_DATA = [
  {
    quantity: 1,
    description: 'book',
    price: 12.49,
    exemptStatus: true,
    importStatus: false,
  },
  {
    quantity: 1,
    description: 'imported bottle of perfume',
    price: 47.5,
    exemptStatus: false,
    importStatus: true
  }
];

const INVALID_DATA = [
  {
    quantity: NaN,
    description: '',
    price: NaN,
    exemptStatus: false,
    importStatus: false
  }
];

describe('CalculateTaxesService', () => {
  let service: CalculateTaxesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateTaxesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly calculate the taxes and apply it to the item price', () => {
    const taxCalcuatedItems = service.calculateTaxes(VALID_DATA);
    expect(taxCalcuatedItems).toEqual([
      {
        quantity: 1,
        description: 'book',
        price: 12.49,
        exemptStatus: true,
        importStatus: false,
        taxes: 0
      },
      {
        quantity: 1,
        description: 'imported bottle of perfume',
        price: 54.65,
        exemptStatus: false,
        importStatus: true,
        taxes: 7.15
      }
    ]);
  });

  /*
  This is a garbage in/garbage out test just to make sure no console errors occur
  In a true production environment this service would not have been called with invalid data
  Would have dealt with that either through the process of sanitizing the inputs or discarding the invalid outputs of the parse function
  */
  it('should parse the invalid input data', () => {
    const parsedData = service.calculateTaxes(INVALID_DATA);
    expect(parsedData).toEqual([
      {
        quantity: null,
        description: '',
        price: 0,
        exemptStatus: false,
        importStatus: false,
        taxes: 0
      }
    ]);
  });
});
