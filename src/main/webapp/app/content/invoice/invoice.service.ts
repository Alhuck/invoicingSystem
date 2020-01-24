import { Apollo } from 'apollo-angular';
import { InvoiceDetails } from './invoice.component';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private apollo: Apollo) {}

  createInvoice(invoiceDetails: InvoiceDetails): void {
    const CREATE_INVOICE_REQUEST = gql`
        mutation {
        createInvoice(
            invoice: {
                totalAmountWithoutTax: invoiceDetails.totalAmountWithoutTax,
                totalTax: invoiceDetails.totalTax,
                totalAmountWithTax: invoiceDetails.totalAmountWithTax
            },
            userDetails: invoiceDetails.userDetails,
            customerDetails: invoiceDetails.customerDetails,
            lineItems: invoiceDetails.productDetails
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
    }`;
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
