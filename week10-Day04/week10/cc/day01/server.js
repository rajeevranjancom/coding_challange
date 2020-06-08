//importing the express module
var express = require("express");

//instilizing the express module
var app = express();

//creating a global middleware for checking if the query string is number or not
app.use(function(req, res, next) {
  var num = req.query.num;
  if (num != "") {
    if (false === isNaN(num)) {
      next();
    } else {
      res.send(
        "<h1 style='color:red;background-color:black'>Not a Number Please enter a number</h1>"
      );
    }
  } else {
    res.send(
      "<h1 style='color:red;background-color:black'>Please enter a number</h1>"
    );
  }
});

//creating the first get method
app.get("/", function(req, res) {
  console.log(req.url);
  res.send("First response from server");
});

//creating the square route
app.get("/square", function(req, res) {
  //console.log(req.url);
  var a = req.query.num;
  var c = a * a;
  res.send(
    "<h1 style='color:gold;background-color:black'>Square is :" + c + "</h1>"
  );
});

//creating the square root route
app.get("/squareroot", function(req, res) {
  var a = req.query.num;
  var c = Math.sqrt(a);
  res.send(
    "<h1 style='color:gold;background-color:black'>Square Root is:" +
      c +
      "</h1>"
  );
});
//setting up my server port
app.listen(8080);
