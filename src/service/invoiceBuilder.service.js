const {v4: uuid} = require('uuid');

module.exports = (rows) =>{
    const invoiceMap={};

    rows.forEach(row =>{
        const invNo = row['Invoice Number'];

        if(!invoiceMap[invNo]){
            invoiceMap[invNo] ={
                id:uuid(),
                invoiceNumber: invNo,
                date: row['Date'],
                customerName: row['Customer Name'],
                lineItems: [],
                totalAmount: 0
            };
        }

        const qty= Number(row['Item Quantity']);
        const price= Number(row['Item Price']);
        
        const total=qty*price;

        invoiceMap[invNo].lineItems.push({
            description: row['Item Description'],
            quantity: qty,
            price,
            total
        });

        invoiceMap[invNo].totalAmount +=total;
    });

    return Object.values(invoiceMap);
}