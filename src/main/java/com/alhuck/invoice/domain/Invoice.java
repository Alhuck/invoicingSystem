package com.alhuck.invoice.domain;

import java.io.Serializable;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;

import com.alhuck.invoice.common.CascadeSave;
import com.alhuck.invoice.common.CascadeSaveCollection;

/**
 * A user.
 */
@org.springframework.data.mongodb.core.mapping.Document(collection = "invoice")
public class Invoice extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @CascadeSave
    private InvoiceUserDetails userDetails;
    @DBRef
    @CascadeSave
    private InvoiceCustomerDetails customerDetails;
    @DBRef
    @CascadeSaveCollection
    private Set<InvoiceLineItems> invoiceProductDetails;
    @Field("total_without_tax")
    private String totalAmountWithoutTax;
    @Field("total_tax")
    private String totalTax;
    @Field("total_with_tax")
    private String totalAmountWithTax;
    

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public InvoiceUserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(InvoiceUserDetails userDetails) {
        this.userDetails = userDetails;
    }

    public InvoiceCustomerDetails getCustomerDetails() {
        return customerDetails;
    }

    public void setCustomerDetails(InvoiceCustomerDetails customerDetails) {
        this.customerDetails = customerDetails;
    }

    public Set<InvoiceLineItems> getInvoiceProductDetails() {
        return invoiceProductDetails;
    }

    public void setInvoiceProductDetails(Set<InvoiceLineItems> invoiceProductDetails) {
        this.invoiceProductDetails = invoiceProductDetails;
    }

    public String getTotalAmountWithoutTax() {
        return totalAmountWithoutTax;
    }

    public void setTotalAmountWithoutTax(String totalAmountWithoutTax) {
        this.totalAmountWithoutTax = totalAmountWithoutTax;
    }

    public String getTotalTax() {
        return totalTax;
    }

    public void setTotalTax(String totalTax) {
        this.totalTax = totalTax;
    }

    public String getTotalAmountWithTax() {
        return totalAmountWithTax;
    }

    public void setTotalAmountWithTax(String totalAmountWithTax) {
        this.totalAmountWithTax = totalAmountWithTax;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Invoice)) {
            return false;
        }
        return id != null && id.equals(((Invoice) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
}
