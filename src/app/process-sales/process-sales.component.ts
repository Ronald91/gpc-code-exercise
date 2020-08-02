import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ParseFileService } from '../services/parse-file.service';
import { CalculateTaxesService } from '../services/calculate-taxes.service';
import { Item } from '../interfaces/cart-item';

@Component({
  selector: 'app-process-sales',
  templateUrl: './process-sales.component.html',
  styleUrls: ['./process-sales.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessSalesComponent implements OnInit {
  file: File;
  baseItems: Item[];
  taxCalculatedItems: Item[];
  @Output()
  taxedItems = new EventEmitter();

  constructor(
    private parseFileService: ParseFileService,
    private calculateTaxService: CalculateTaxesService
  ) {}

  fileUploaded(event: any): void {
    this.file = event.target.files[0];
  }

  readFile(): void {
    let fileLines: string[];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      fileLines = fileReader.result.toString().trim().split('\n');
      this.processInput(fileLines);
    };
    fileReader.readAsText(this.file);
  }

  processInput(fileLines: string[]): void {
    this.baseItems = this.parseFileService.parseFileLines(fileLines);
    this.taxCalculatedItems = this.calculateTaxService.calculateTaxes(
      this.baseItems
    );
    this.taxedItems.emit(this.taxCalculatedItems);
  }

  ngOnInit(): void {}
}
