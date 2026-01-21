const fs=require('fs');
const parseFile=require('../service/fileParser.service');
const validateRows=require('../service/validation.service')
const buildInvoices=require('../service/invoiceBuilder.service')
const createInvoices=require('../service/invoiceCreator.service')

exports.handleUpload= async(req,res,next)=>{
    try{

        if(!req.file) throw new Error('File not Provided');

        const rows=await parseFile(req.file.path);
        const validatedRows=validateRows(rows);

        const validRows=validatedRows.filter(r=> !r.Errors);
        const errorRows=validatedRows.filter(r=>r.Errors);

        const invoice=buildInvoices(validRows);
        await createInvoices(invoice);


        res.json({
            totalRows: rows.length,
            validInvoice: invoice.length,
            rowsWithErrors: errorRows.length,
            errorRows
        });

        fs.unlinkSync(req.file.path);

    }catch(err){
        next(err);
    }
};