import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogBoxComponent, ProductDetails } from 'app/content/invoice/dialog/dialog-box.component';
import { BehaviorSubject } from 'rxjs';
import { InvoiceService } from 'app/content/invoice/invoice.service';

export interface InvoiceDetails {
  id: number;
  userDetails: Object;
  customerDetails: Object;
  productDetails: Array<ProductDetails>;
  totalAmount: number;
  totalTax: number;
  totalAmountWithTax: number;
}
@Component({
  selector: 'invoice-content',
  providers: [InvoiceService],
  templateUrl: './invoice.component.html',
  styleUrls: ['invoice.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  userDetails: FormGroup;
  customerDetails: FormGroup;
  displayedColumns: string[] = ['select', 'sno', 'productName', 'quantity', 'price', 'rowTotal', 'actions'];
  dataSource = new MatTableDataSource<ProductDetails>();
  selection = new SelectionModel<any>(true, []);
  dataSourceBS = new BehaviorSubject(this.dataSource);
  totalAmountWithoutTax = 0;
  totalTax = 0;
  totalAmountWithTax = 0;

  constructor(private fb: FormBuilder, public dialog: MatDialog, public invoiceService: InvoiceService) {
    this.dataSourceBS.subscribe(() => {
      this.totalAmountWithoutTax = 0;
      this.totalTax = 0;
      this.totalAmountWithTax = 0;

      this.dataSource.data.forEach(data => {
        this.totalAmountWithoutTax += parseInt(data.rowTotal, 10);
      });

      this.totalTax = (this.totalAmountWithoutTax * 1.13) / 100;
      this.totalAmountWithTax = this.totalAmountWithoutTax + this.totalTax;
    });

    this.userDetails = this.fb.group({
      name: [''],
      companyName: [''],
      street: [''],
      city: [''],
      province: [''],
      zipcode: [''],
      country: ['']
    });

    this.customerDetails = this.fb.group({
      firstName: [''],
      lastName: [''],
      companyName: [''],
      street: [''],
      city: [''],
      province: [''],
      zipcode: [''],
      country: ['']
    });
  }

  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

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
    rowObj.price = parseInt(rowObj.price, 10).toFixed(2);
    rowObj.quantity = parseInt(rowObj.quantity, 10).toFixed(2);
    rowObj.rowTotal = (parseInt(rowObj.price, 10) * parseInt(rowObj.quantity, 10)).toFixed(2);
    temp.push(rowObj);
    this.dataSource.data = temp;
    this.dataSourceBS.next(this.dataSource);
  }

  updateRowData(rowObj: ProductDetails): void {
    let temp = this.dataSource.data.slice();
    temp = temp.filter(value => {
      if (value.id === rowObj.id) {
        value.productName = rowObj.productName;
        value.price = parseInt(rowObj.price, 10).toFixed(2);
        value.quantity = parseInt(rowObj.quantity, 10).toFixed(2);
        value.rowTotal = (parseInt(rowObj.price, 10) * parseInt(rowObj.quantity, 10)).toString();
      }
      return true;
    });
    this.dataSource.data = temp;
    this.dataSourceBS.next(this.dataSource);
  }

  deleteRowData(rowObj: ProductDetails): void {
    let temp = this.dataSource.data.slice();
    temp = temp.filter(value => {
      return value.id !== rowObj.id;
    });
    this.dataSource.data = temp;
    this.dataSourceBS.next(this.dataSource);
  }

  saveInvoice(): void {
    const saveInvoiceObj: InvoiceDetails = {} as InvoiceDetails;
    saveInvoiceObj.customerDetails = this.userDetails.value;
    saveInvoiceObj.userDetails = this.customerDetails.value;
    saveInvoiceObj.productDetails = this.dataSource.data;
    saveInvoiceObj.totalAmount = this.totalAmountWithoutTax;
    saveInvoiceObj.totalTax = this.totalTax;
    saveInvoiceObj.totalAmountWithTax = this.totalAmountWithTax;
    // eslint-disable-next-line no-console
    // console.log(JSON.stringify(saveInvoiceObj));
  }

  clearInvoice(): void {
    this.dataSource.data = [];
    this.userDetails.reset();
    this.customerDetails.reset();
    this.dataSourceBS.next(this.dataSource);
  }
}
