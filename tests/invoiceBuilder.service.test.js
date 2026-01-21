const buildInvoices = require('../src/service/invoiceBuilder.service');

describe('Invoice Builder', () => {
    test('groups multiple rows into a single invoice', () => {
        const rows = [
            {
                'Invoice Number': 'INV1',
                'Date': '2024-01-01',
                'Customer Name': 'ABC',
                'Item Description': 'Item1',
                'Item Quantity': '2',
                'Item Price': '10'
            },
            {
                'Invoice Number': 'INV1',
                'Date': '2024-01-01',
                'Customer Name': 'ABC',
                'Item Description': 'Item1',
                'Item Quantity': '1',
                'Item Price': '20'
            }
        ];

        const invoices = buildInvoices(rows);

        expect(invoices.length).toBe(1);
        expect(invoices[0].totalAmount).toBe(40);
    });
});
