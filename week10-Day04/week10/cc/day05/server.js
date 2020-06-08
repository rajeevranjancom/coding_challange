//importing all the required modules
const express = require("express");
const hbs = require("hbs");
const fetch = require("node-fetch");
const path = require("path");
const morgan = require("morgan");

//initillazing the express module
const app = express();

//setting up all the required middlewares
app.set("view engine", "hbs");
app.use(morgan("dev"));
app.use(express.json());

//setting up the paths
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.use(express.static(path.join(__dirname, 'static')));

//setting up all the routes

//route to the index.hbs file
app.get("/home", function(req, res) {
  let name = req.query.q;
  res.render("index", { name });
});
//route to todo.hbs file
app.get("/todo", function(req, res) {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
    .then(function(res) {
      return res.json();
    })
    .then(function(resObj) {
      let todo = resObj;
      res.render("todo", { todo });
    });
});
//route to the contact us page
app.get('/contactus', function(req, res) {
  res.sendFile(path.join(__dirname,  'contactus.html'))
})
//setting up the port
app.listen(8080);
