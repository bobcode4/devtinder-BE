const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sarath:Ucmsarath18$@namastenode.blixm.mongodb.net/devTinder");
};

module.exports = connectDB;



