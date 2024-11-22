const express = require("express");
const connectDB = require("./config/database");
const cookieParser  = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');
const feedRouter = require('./routes/feedRouter');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', feedRouter);

  
connectDB()
    .then(()=> {
        console.log("DataBase connected Succesfully");
        app.listen(7777, ()=> {
            console.log("Server listening at port 7777")
        });
    })
    .catch((err)=> {
        console.error("Connection Unsuccessfull : "+ err.message);
    })




 



