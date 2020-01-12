import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogBoxComponent, ProductDetails } from 'app/content/invoice/dialog/dialog-box.component';

@Component({
  selector: 'invoice-content',
  templateUrl: './invoice.component.html',
  styleUrls: ['invoice.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  options: FormGroup;
  displayedColumns: string[] = ['select', 'sno', 'productName', 'quantity', 'price', 'rowTotal', 'actions'];
  dataSource = new MatTableDataSource<ProductDetails>();
  selection = new SelectionModel<any>(true, []);
  // this.dataSource = [{ sno: 1, productName: 'ipad', quantity: 1, price: 3000, rowTotal: 3000 }];

  constructor(fb: FormBuilder, public dialog: MatDialog) {
    this.options = fb.group({
      floatLabel: 'auto'
    });
  }

  // openDialog(action, obj) {

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

  // addProductItems(): any {

  //   const dummyObj = { sno: 1, productName: 'ipad', quantity: 1, price: '3,000.00', rowTotal: '3,000.00' };
  //   const temp = this.dataSource.data.slice();
  //   temp.push(dummyObj);
  //   this.dataSource.data = temp;
  // }
  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObj: ProductDetails): void {
    const date = new Date();
    const temp = this.dataSource.data.slice();
    rowObj.id = date.getTime();
    rowObj.sno = this.dataSource.data.length + 1;
    rowObj.rowTotal = (parseInt(rowObj.price, 10) * rowObj.quantity).toString();
    temp.push(rowObj);
    this.dataSource.data = temp;
    // this.table.renderRows();
  }
  updateRowData(rowObj: ProductDetails): void {
    let temp = this.dataSource.data.slice();
    temp = temp.filter(value => {
      if (value.id === rowObj.id) {
        value.productName = rowObj.productName;
        value.price = rowObj.price;
        value.quantity = rowObj.quantity;
        value.rowTotal = (parseInt(rowObj.price, 10) * rowObj.quantity).toString();
      }
      return true;
    });
    this.dataSource.data = temp;
  }
  deleteRowData(rowObj: ProductDetails): void {
    let temp = this.dataSource.data.slice();
    temp = temp.filter(value => {
      return value.id !== rowObj.id;
    });
    this.dataSource.data = temp;
  }
}
