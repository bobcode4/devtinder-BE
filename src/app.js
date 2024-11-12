const express = require("express");

const app = express();

app.listen(3008, ()=> {
    console.log("Server running at port 3008")
});

app.use('/hi', (req, res) => {
    res.send("Hell0 from the server");
})



