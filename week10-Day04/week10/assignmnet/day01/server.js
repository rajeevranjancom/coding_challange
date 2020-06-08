//importing the express module
var express = require("express");

//instilizing the express module
var app = express();
app.use(express.json());

//creating a middle ware to check if the input is a number or not and not left blank
app.use(function(req, res, next) {
  var num1 = req.body.num1;
  var num2 = req.body.num2;
  if (num1 != "" && num2 != "") {
    if (false === isNaN(num1) && false === isNaN(num2)) {
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
  res.send("First response form server");
});

//creating the add route
app.post("/add", function(req, res) {
  var a = Number(req.body.num1);
  var b = Number(req.body.num2);
  var c = a + b;
  res.json({ result: c });
});

//creating the subtract route
app.post("/sub", function(req, res) {
  var a = Number(req.body.num1);
  var b = Number(req.body.num2);
  var c = a - b;
  res.json({ result: c });
});

//creating the multiply route
app.post("/multi", function(req, res) {
  var a = Number(req.body.num1);
  var b = Number(req.body.num2);
  var c = a * b;
  res.json({ result: c });
});

//creating the divide route
app.post("/divd", function(req, res) {
  var a = Number(req.body.num1);
  var b = Number(req.body.num2);
  var c = a / b;
  res.json({ result: c });
});

//setting up my server port
app.listen(8080);
