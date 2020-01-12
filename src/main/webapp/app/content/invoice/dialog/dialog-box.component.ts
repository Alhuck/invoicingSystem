// dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ProductDetails {
  id: number;
  productName: string;
  quantity: number;
  price: string;
  rowTotal: string;
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

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductDetails
  ) {
    // console.log(data);
    this.localData = { ...data };
    this.action = this.localData.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
