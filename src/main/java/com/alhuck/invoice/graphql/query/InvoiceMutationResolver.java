package com.alhuck.invoice.graphql.query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.alhuck.invoice.domain.Invoice;
import com.alhuck.invoice.domain.InvoiceCustomerDetails;
import com.alhuck.invoice.domain.InvoiceLineItems;
import com.alhuck.invoice.domain.InvoiceUserDetails;
import com.alhuck.invoice.domain.User;
import com.alhuck.invoice.repository.InvoiceRepository;
import com.alhuck.invoice.repository.UserRepository;
import com.alhuck.invoice.service.UserService;
import com.alhuck.invoice.service.dto.UserDTO;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;

@Component
public class InvoiceMutationResolver implements GraphQLMutationResolver {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public Invoice createInvoice(Invoice invoice, InvoiceUserDetails userDetails, InvoiceCustomerDetails customerDetails, Set<InvoiceLineItems> lineItems) {
        invoice.setInvoiceProductDetails(lineItems);
        invoice.setUserDetails(userDetails);
        invoice.setCustomerDetails(customerDetails);
        return this.invoiceRepository.save(invoice);
    }

    public List<Invoice> getInvoices() {
        return (List<Invoice>) this.invoiceRepository.findAll();
    }

}
