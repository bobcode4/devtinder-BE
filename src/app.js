const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post('/signup', async (req,res) => {
    const userObj = {
        firstName : "Virat",
        lastName : "Kohli",
        emailId : "virat@tinder.com",
        password : "Virat@123",
    };

    const user = new User(userObj);
    try {
        await user.save();
        res.send("user saved");
    } catch (err){
        res.status(400).send("Error saving the user "+ err.message);
    }
})





connectDB()
    .then(()=> {
        console.log("DataBase connected Succesfully");
        app.listen(3008, ()=> {
            console.log("Server listening at port 3008")
        });
    })
    .catch((err)=> {
        console.error("Connection Unsuccessfull");
    })



 



