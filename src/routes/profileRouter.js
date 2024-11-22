const express = require('express');
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const User = require("../models/user");

profileRouter.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Someting went wrong : "+err.message);
    }
    
});

profileRouter.delete('/user', async (req,res) => {
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

profileRouter.patch('/user', async (req,res) => {
    const data = req.body;
    const {userId, skills} = data;
    
    const ALLOWED_FIELDS = [
        "skills", "about", "age", "userId"
    ]
    const isAllowed = Object.keys(data).every((key)=> ALLOWED_FIELDS.includes(key));
    
    const user = await User.findByIdAndUpdate(userId, {skills : skills}, {returnDocument : 'after'});

    try{
        if(!user) res.send("No user found with the given id")
        else if(!isAllowed) res.send("Update not allowed")
        else res.send(`updated user : ${user}\n user updated successfully`)
    } catch(err) {
        res.status(400).send("something went wrong " + err.message)
    }
}) 

module.exports = profileRouter;