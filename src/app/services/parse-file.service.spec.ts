import { TestBed } from '@angular/core/testing';

import { ParseFileService } from './parse-file.service';

const VALID_INPUT_DATA = ['1,book,12.49,Y,N'];
const INVALID_INPUT_DATA = ['abcdefg'];

describe('ParseFileService', () => {
  let service: ParseFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse the valid input data', () => {
    const parsedData = service.parseFileLines(VALID_INPUT_DATA);
    expect(parsedData).toEqual([
      {
        quantity: 1,
        description: 'book',
        price: 12.49,
        exemptStatus: true,
        importStatus: false
      }
    ]);
  });

  /*
  This is a garbage in/garbage out test just to make sure no console errors occur
  In a true production environment I would do some conditionals to verify the data before parsing the entry
  */
  it('should parse the invalid input data', () => {
    const parsedData = service.parseFileLines(INVALID_INPUT_DATA);
    expect(parsedData).toEqual([
      {
        quantity: NaN,
        description: '',
        price: NaN,
        exemptStatus: false,
        importStatus: false
      }
    ]);
  });
});
