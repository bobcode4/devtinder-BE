const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json())

app.post('/signup', async (req,res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.send("user saved");
    } catch (err){
        res.status(400).send("Error saving the user "+ err.message);
    }
});

app.get('/feed', async (req,res) => {
    const users = await User.find({});
    try {
        if(users.length === 0){
            res.status(404).send("Users not found")
        } else {
            res.send(users);
        }     
    }
    catch {
        res.send("Something went wrong")
    }
});

app.delete('/user', async (req,res) => {
    const userId = req.body.id;
    try {
        const user = await User.findByIdAndDelete(userId);
        console.log(user.isArray())
        if(!user) res.send("user already deleted")
        else res.send(type(user));
    } catch (err) {
        res.status(400).send("Something went wrong "+err.message)
    }
})

app.patch('/user', async (req,res) => {
    const {userId, emailId} = req.body;
    const user = await User.findByIdAndUpdate(userId, {emailId : emailId}, {returnDocument : 'after'});
    try{
        if(!user) res.send("No user found with the given id")
        else res.send(`updated user : ${user}\n user updated successfully`)
    } catch(err) {
        res.status(400).send("something went wrong " + err.message)
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



 



