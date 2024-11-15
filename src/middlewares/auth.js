const adminAuth = (req, res, next) => {
    const token = "sarath";
    const isAdminAuthorized = token === "sarath";
    if (isAdminAuthorized) next();
    else res.status(401).send("Access Denied!!");
}

module.exports =  adminAuth;