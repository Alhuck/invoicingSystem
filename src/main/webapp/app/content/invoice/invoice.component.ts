import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'invoice-content',
  templateUrl: './invoice.component.html',
  styleUrls: ['invoice.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  options: FormGroup;
  displayedColumns: string[] = ['sno', 'productName', 'quantity', 'price', 'rowTotal'];
  dataSource = [{ sno: 1, productName: 'ipad', quantity: 1, price: 3000, rowTotal: 3000 }];

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      floatLabel: 'auto'
    });
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
