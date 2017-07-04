var express = require('express');
var app = express();
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var path = require("path");

//Todo: username and pswd should be read from config files
mongoose.connect("mongodb://user:user@ds141082.mlab.com:41082/coj");

//add this line to handle request for all static files
app.use(express.static(path.join(__dirname, '../public')));

app.use("/api/v1", restRouter);
app.use("/", indexRouter);

//use client side router for other path
app.use(function(req, res){
    res.sendFile("index.html", { root: path.join(__dirname, '../public') })
});

app.listen(3000, function(){
    console.log("App listening on port 3000!")
});

