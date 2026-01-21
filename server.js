const app=require('./src/index');

const PORT=3000;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})