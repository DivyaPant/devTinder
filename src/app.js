const express = require('express');
const connectDB = require('./config/database');

const app = express();
const port = 8080;


connectDB().then(()=>{
console.log('DB connected')
app.listen(port, ()=>{
    console.log(`App listening on port: ${port}`);
});
}).catch(()=>{
console.log('DB connection failed!!')
})
