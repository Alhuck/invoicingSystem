package com.alhuck.invoice.domain;

import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "invoice_customer_details")
public class InvoiceCustomerDetails {

    @Id
    private String id;
    @Size(max = 50)
    @Field("first_name")
    private String firstName;
    @Size(max = 50)
    @Field("last_name")
    private String lastName;
    @Size(max = 50)
    @Field("company_name")
    private String companyName;
    @Size(max = 50)
    @Field("address1")
    private String address1;
    @Size(max = 50)
    @Field("address2")
    private String address2;
    @Size(max = 50)
    @Field("city")
    private String city;
    @Size(max = 50)
    @Field("province")
    private String province;
    @Size(max = 50)
    @Field("zip_code")
    private String zipCode;
    @Size(max = 50)
    @Field("country")
    private String country;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

}
