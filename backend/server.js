const express = require("express")
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const {Book} = require('./models/bookModels');
const bodyParser = require("body-parser");
const bookRoute = require('./routes/booksRoutes')
dotenv.config();
const PORT = process.env.PORT;
const mongoUrl = process.env.mongoUrl;
const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.get("/",(req,res)=>{
    res.status(201).send("Welcome to LibraWEB");
})
app.use('/books',bookRoute)
mongoose.connect(mongoUrl)
.then(()=>{
    console.log("Database got connected");
    app.listen(PORT,()=>{
        console.log(`App is listening at port ${3000}`)
    })
})
.catch((error)=>{
    console.log(error);
})