const jwt = require("jsonwebtoken");
const User = require("../models/user")

const adminAuth = (req, res, next) => {
    const token = "sarath";
    const isAdminAuthorized = token === "sarath";
    if (isAdminAuthorized) next();
    else res.status(401).send("Access Denied!!");
};

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if(!token){
            throw new Error("Token is not valid")
        }

        const decodedObj = await jwt.verify(token, "DEVTINDER@18$");
        const {_id} = decodedObj;
        const user = await User.findById(_id);

        if(!user){
            throw new Error("user not found");
        }
        req.user = user;
        next()
    } catch(err) {
        res.status(400).send("Error : "+err.message)
    }
}

module.exports = { adminAuth, userAuth };