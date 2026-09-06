const express = require('express');

const app = express();
const port = 8080;


app.use('/hello', (req, res)=>{
    res.send("Hello from hello route")
});

app.use('/', (req, res)=> {
    res.send("Hi from server!")
});


app.listen(port, ()=>{
    console.log(`App listening on port: ${port}`);
});