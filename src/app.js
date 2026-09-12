const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/userModel');

const app = express();
const port = 8080;

// Enable the middleware to parse JSON bodies
app.use(express.json());


app.post('/signup', async (req, res)=>{
    const data = req.body;
    try {
        const user = new User(data);
        await user.save()
        res.send("Sign up successful");
    } catch(err) {
        console.log(err);
        res.status(500).send("Something went wrong!!")
    }
    
});

app.get('/user', async (req, res) => {
    const email = req.query.email;
   try {
        const user = await User.findOne({ email : email});
        res.send(user);
   } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong!!")
   } 
});

app.get('/user/:id', async (req, res) => {
const id = req.params.id;
   try {
        const user = await User.findById(id);
        res.send(user);
   } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong!!")
   } 
});

app.patch('/user', async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOneAndUpdate({email : email}, req.body, {upsert : true, returnDocument: 'after'});
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong!!")
    }
})

app.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const op = await User.findByIdAndDelete(id);
        console.log(op);
        res.send("User deleted")
    } catch {
        res.status(500).send("Something went wrong!!")
    }
})

app.get('/feed', async (req, res)=> {
    try {
        const users = await User.find({});
        res.send(users);
    } catch {
        res.status(500).send("Something went wrong!")
    }
});





connectDB().then(()=>{
console.log('DB connected')
app.listen(port, ()=>{
    console.log(`App listening on port: ${port}`);
});
}).catch(()=>{
console.log('DB connection failed!!')
})
