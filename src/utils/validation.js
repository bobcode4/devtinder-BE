const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    
    if(!firstName || !lastName) {
        throw new Error("Full Name Required")
    } else if(firstName.length<4 || firstName.length>30) {
        throw new Error("firstName should be b/w 4 and 20 characters")
    } else if(lastName.length<4 || lastName.length>30) {
      throw new Error("lasttName should be b/w 4 and 20 characters")
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password")
    } else if(!validator.isEmail(emailId)) { 
        throw new Error("Invalid EmailID")
    }
}

module.exports = {
    validateSignUpData,
}  