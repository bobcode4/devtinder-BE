const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt"); 

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : String,
    emailId : {
        type : String,
        unique : true,
        trim : true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("InValid Email Address : "+ value)
            }
        }
    },
    password : {
        type : String,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is weak")
            } 
        }
    },
    age : Number,
    gender : String,
    skills : [String],
    about : String
}, 
{timestamps : true});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id : user._id}, "DEVTINDER@18$", {expiresIn : '7d'});
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);