import { Apollo } from 'apollo-angular';
import { InvoiceDetails } from './invoice.component';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private apollo: Apollo) {}

  createInvoice(invoiceDetails: InvoiceDetails): void {
    const totalAmountWithoutTax: string = invoiceDetails.totalAmountWithTax.toFixed(2);
    const totalTax: string = invoiceDetails.totalTax.toFixed(2);
    const totalAmountWithTax: string = invoiceDetails.totalAmountWithTax.toFixed(2);
    const userDetails: Object = invoiceDetails.userDetails;
    const customerDetails: Object = invoiceDetails.customerDetails;
    const productDetails: Object = invoiceDetails.productDetails;

    const CREATE_INVOICE_REQUEST = gql`
      mutation {
        createInvoice(
          invoice: { totalAmountWithoutTax: totalAmountWithoutTax, totalTax: totalTax, totalAmountWithTax: totalAmountWithTax }
          userDetails: userDetails
          customerDetails: customerDetails
          lineItems: productDetails
        ) {
          id
          userDetails {
            name
          }
          customerDetails {
            firstName
            lastName
          }
        }
      }
    `;
    this.apollo
      .mutate({
        mutation: CREATE_INVOICE_REQUEST
      })
      .subscribe(response => {
        // eslint-disable-next-line no-console
        console.log(response);
      });
  }
}
