import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessSalesComponent } from './process-sales.component';

const DATA = [
  '1,book,12.49,Y,N',
  '1,music CD,14.99,N,N',
  '1,chocolate bar,0.85,Y,N'
];

describe('ProcessSalesComponent', () => {
  let component: ProcessSalesComponent;
  let fixture: ComponentFixture<ProcessSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessSalesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have parsed the file and calculated the sales taxes', () => {
    component.processInput(DATA);
    expect(component.baseItems).toBeDefined();
    expect(component.taxCalculatedItems).toBeDefined();
  });

  it('should have emitted the taxCalculatedItems', () => {
    spyOn(component.taxedItems, 'emit');
    component.processInput(DATA);
    expect(component.taxedItems.emit).toHaveBeenCalledWith([
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
        description: 'music CD',
        price: 16.490000000000002,
        exemptStatus: false,
        importStatus: false,
        taxes: 1.5
      },
      {
        quantity: 1,
        description: 'chocolate bar',
        price: 0.85,
        exemptStatus: true,
        importStatus: false,
        taxes: 0
      }
    ]);
  });
});
