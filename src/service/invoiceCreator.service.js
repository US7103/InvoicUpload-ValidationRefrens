module.exports = async (invoices) => {
    for(const invoice of invoices){
        try{
            console.log('Creating Invoice:', invoice.invoiceNumber);
            console.log(JSON.stringify(invoice, null, 2));

        } catch (err){
            console.error('Failed invoice:', invoice.invoiceNumber);
        }
    }
};