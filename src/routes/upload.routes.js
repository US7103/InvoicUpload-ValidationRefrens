const express=require('express');
const multer=require('multer');
const uploadController=require('../controller/upload.controller')

const router=express.Router();

const upload= multer({
    dest:'uploads/',
    fileFilter: (req,file,cb) =>{
        if( file.mimetype === 'text/csv' || file.mimetype.includes('spreadsheet')){
            cb(null,true);
        } else{
            cb(new Error('Only CSV or Excel files allowed'));
        }
    }
})

router.post('/',upload.single('file'),uploadController.handleUpload);

module.exports=router;
