import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogBoxComponent, ProductDetails } from 'app/content/invoice/dialog/dialog-box.component';
import { BehaviorSubject } from 'rxjs';

export interface UserDetails {
  name: string;
  companyName: string;
  street: string;
  city: string;
  provice: string;
  zipcode: string;
  country: string;

  // constructor() {

  //   this.name = "";
  //   this.companyName = "";
  //   this.street = "";
  //   this.city = "";
  //   this.provice = "";
  //   this.zipcode = "";
  //   this.country = "";
  // }
}

export class CustomerDetails {
  firstName: string;
  secondName: string;
  companyName: string;
  street: string;
  city: string;
  provice: string;
  zipcode: string;
  country: string;

  constructor() {
    this.firstName = '';
    this.secondName = '';
    this.companyName = '';
    this.street = '';
    this.city = '';
    this.provice = '';
    this.zipcode = '';
    this.country = '';
  }
}

@Component({
  selector: 'invoice-content',
  templateUrl: './invoice.component.html',
  styleUrls: ['invoice.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  // userDetails: FormGroup;
  // customerDetails: FormGroup;
  displayedColumns: string[] = ['select', 'sno', 'productName', 'quantity', 'price', 'rowTotal', 'actions'];
  dataSource = new MatTableDataSource<ProductDetails>();
  selection = new SelectionModel<any>(true, []);
  dataSourceBS = new BehaviorSubject(this.dataSource);
  totalAmountWithoutTax = 0;
  totalTax = 0;
  totalAmountWithTax = 0;
  // userDetails = new UserDetails();
  // customerDetails = new CustomerDetails();

  userDetails = new FormGroup({
    name: new FormControl({ value: '' }),
    companyName: new FormControl({ value: '' }),
    street: new FormControl({ value: '' }),
    city: new FormControl({ value: '' }),
    province: new FormControl({ value: '' }),
    zipcode: new FormControl({ value: '' }),
    country: new FormControl({ value: '' })
  });

  customerDetails = new FormGroup({
    firstName: new FormControl({ value: '' }),
    lastName: new FormControl({ value: '' }),
    companyName: new FormControl({ value: '' }),
    street: new FormControl({ value: '' }),
    city: new FormControl({ value: '' }),
    province: new FormControl({ value: '' }),
    zipcode: new FormControl({ value: '' }),
    country: new FormControl({ value: '' })
  });
  constructor(fb: FormBuilder, public dialog: MatDialog) {
    // this.userDetails = fb.group({
    //   floatLabel: 'auto'
    // });

    // eslint-disable-next-line no-console
    console.dir(this.userDetails);
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
    rowObj.rowTotal = (parseInt(rowObj.price, 10) * rowObj.quantity).toString();
    temp.push(rowObj);
    this.dataSource.data = temp;
    this.dataSourceBS.next(this.dataSource);
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
}
