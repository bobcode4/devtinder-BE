const express = require('express');
const authRouter = express.Router();
const User = require("../models/user");
const cookieParser  = require("cookie-parser");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt"); 


authRouter.use(express.json());
authRouter.use(cookieParser());


authRouter.post('/signup', async (req,res) => {
    try {
        //Data Validation
        validateSignUpData(req);
        const {firstName, lastName, emailId, password} = req.body;

        //Encrypting password
        const passwordHash = await bcrypt.hash(password, 10);

        //creating new instance of a user   
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash
        });
        await user.save();
        res.send("user saved");
    } catch (err){
        res.status(400).send("Error : "+ err.message);
    }
}); 

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({emailId:emailId});

        if(!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = user.validatePassword(password);

        if(isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token);
            res.send("Login Successful !!!!");         
        }
        else {
            throw new Error("Invalid password");
        }
    } catch(err) {
        res.status(400).send("Error : "+ err.message);
    }
});

module.exports = authRouter;
