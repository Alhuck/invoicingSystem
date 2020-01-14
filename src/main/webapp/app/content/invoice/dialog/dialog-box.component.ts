// dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ProductDetails {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  rowTotal: number;
  sno: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  action: string;
  localData: any;

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductDetails) {
    data.quantity = Math.round(data.quantity * 100) / 100;
    data.price = parseFloat(data.price).toFixed(2);

    this.localData = { ...data };
    this.action = this.localData.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  modelChanged(e: any): void {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
