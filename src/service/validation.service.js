
const {isValidDate} =require('../utils/date.util');

const REQUIRED_FIELDS = [
    'Invoice Number',
    'Date',
    'Customer Name',
    'Item Description',
    'Item Quantity',
    'Item Price'
];

module.exports=(rows)=>{
    const seenInvoices = new Set();

    return rows.map(row => {
        const errors=[];

        REQUIRED_FIELDS.forEach(field => {
            if(!row[field]) errors.push(`${field} is required`);
        });

        if (row['Date'] && !isValidDate(row['Date'])) {
            errors.push('Invalid Date format');
        }

        ['Item Quantity','Item Price', 'Item Total', 'Total Amount'].forEach(f=> {
            if(row[f] && isNaN(Number(row[f]))){
                errors.push(`${f} must be numeric`);
            }
        });

        const invoiceNo= row['Invoice Number'];
        if(invoiceNo){
            if(seenInvoices.has(invoiceNo) === false){
                seenInvoices.add(invoiceNo);
            }
        }

        return{
            ...row,
            Errors: errors.length ? errors.join('; ') : null
        };
    });
};