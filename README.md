# Invoice System

Open sourced project for creating simple invoices for SMEs

# To-dos on invoice system

1.  Need to fix issue in form group name of user/customer invoice details -- Done
2.  Format the number to 2 decimal places accordingly -- Done
    - written a directive, need to make it work
      - while initializing the input value and (added workaround)
      - on adding the value to grids (added workaround)
3.  Need to construct the http request on save invoice routine -- Done
4.  Need to implement the reset/clear invoice routine -- Done
5.  GraphQL need to be implemented for the save and fetch routines -- WIP
    5.1. configure the graphql server with the backend -- DONE
    5.2. create mutation routine for invoice -- WIP
    -created classes and resolver and graphql schema, trying to make a mutation call to graphql backend of mutation resolver -- DONE
    5.3. creating the other entity references inside the invoice entity -- WIP
6.  Print the invoice to pdf routine need to be implemented
7.  Need to add some basic validations for the invoice form
8.  Option to add company logo into the invoice design
