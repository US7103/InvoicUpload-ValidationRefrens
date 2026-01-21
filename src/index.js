const express=require('express');
const uploadRoutes=require('../src/routes/upload.routes')

const app=express();
app.use(express.json());

app.use('/upload',uploadRoutes);

app.use((err,req,res, next)=>{
    console.error(err);
    res.status(err.status || 500).json({
        message:err.message || 'Internal Server Error'
    });
});

module.exports=app;

