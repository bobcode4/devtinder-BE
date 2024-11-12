const express = require("express");

const app = express();

app.listen(3008, ()=> {
    console.log("Server running at port 3008")
});

app.get('/about', (req, res) => {
    res.send("Got About Page for You");
});

app.delete('/user', (req, res) => {
    res.send("Deleted the user");
});

app.post('/user', (req, res) => {
    console.log("User added")
    res.send({firstName:"Sarath", lastName:"Kumar"});
});


app.put('/user', (req, res) => {
    res.send("user updated");
});





