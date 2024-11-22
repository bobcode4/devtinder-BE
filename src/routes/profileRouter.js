const express = require('express');
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation")

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

profileRouter.patch('/profile/edit', userAuth, async (req,res) => {
    try{
        if(!validateEditProfileData(req.body)){
            throw new Error("Edit Not Allowed")
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();
        res.json({
            "message" : `${loggedInUser.firstName}, Your profile updated successfuly`,
            "updatedData" : loggedInUser
        }
        )
        res.send();


    } catch(err) {
        res.status(400).send("ERROR : "+ err.message)
    }
}) 

module.exports = profileRouter;