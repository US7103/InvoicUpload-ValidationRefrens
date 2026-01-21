const fs=require('fs');
const csv=require('csv-parser');
const xlsx=require('xlsx');

module.exports=(filePath) =>{
    return new Promise((resolve, reject)=>{
        if(filePath.endsWith('.csv')){
            const rows=[];
            fs.createReadStream(filePath)
              .pipe(csv())
              .on('data', data=>rows.push(data))
              .on('end', ()=> resolve(rows))
              .on('error', reject);

        } else{
            const workbook=xlsx.readFile(filePath);
            const sheet=workbook.Sheets[workbook.SheetNames[0]];
            resolve(xlsx.utils.sheet_to_json(sheet));
        }
    });
};