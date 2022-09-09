const express = require("express");

const Rout = require('./router/rout.js')

const app = express();


app.use(express.static(__dirname + "/public"));

app.use(Rout)

app.listen(3000, function() {
  console.log("Server started");
});

