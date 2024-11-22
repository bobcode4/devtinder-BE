const express = require("express");
const feedRouter = express.Router();
const User = require("../models/user");

feedRouter.get('/feed', async (req,res) => {
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

module.exports = feedRouter;