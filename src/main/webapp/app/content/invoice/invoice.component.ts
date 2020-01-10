import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'invoice-content',
  templateUrl: './invoice.component.html',
  styleUrls: ['invoice.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  options: FormGroup;
  displayedColumns: string[] = ['select', 'sno', 'productName', 'quantity', 'price', 'rowTotal'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  // this.dataSource = [{ sno: 1, productName: 'ipad', quantity: 1, price: 3000, rowTotal: 3000 }];

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      floatLabel: 'auto'
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): any {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  addProductItems(): any {
    const dummyObj = { sno: 1, productName: 'ipad', quantity: 1, price: 3000, rowTotal: 3000 };
    const temp = this.dataSource.data.slice();
    temp.push(dummyObj);
    this.dataSource.data = temp;
  }
}
