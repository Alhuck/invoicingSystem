import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'invoice-content',
  templateUrl: './invoice.component.html',
  styleUrls: ['invoice.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      floatLabel: 'auto'
    });
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
