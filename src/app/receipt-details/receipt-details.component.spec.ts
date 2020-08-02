import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptDetailsComponent } from './receipt-details.component';

import { MatCardModule } from '@angular/material/card';

const DATA = [
  {
    quantity: 1,
    description: 'book',
    price: 12.49,
    exemptStatus: true,
    importStatus: false,
    taxes: 0,
  },
  {
    quantity: 1,
    description: 'music CD',
    price: 16.490000000000002,
    exemptStatus: false,
    importStatus: false,
    taxes: 1.5,
  },
  {
    quantity: 1,
    description: 'chocolate bar',
    price: 0.85,
    exemptStatus: true,
    importStatus: false,
    taxes: 0
  }
];

describe('ReceiptDetailsComponent', () => {
  let component: ReceiptDetailsComponent;
  let fixture: ComponentFixture<ReceiptDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [ReceiptDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptDetailsComponent);
    component = fixture.componentInstance;
    component.items = DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present the displayed costs rounded to 2 decimal places', () => {
    expect(component.salesTaxes).toBe('1.50');
    expect(component.total).toBe('29.83');
    expect(component.itemsToDisplay).toEqual([
      { quantity: 1, description: 'book', price: '12.49' },
      { quantity: 1, description: 'music CD', price: '16.49' },
      { quantity: 1, description: 'chocolate bar', price: '0.85' }
    ]);
  });
});
