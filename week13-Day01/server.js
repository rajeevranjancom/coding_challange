var express = require('express');
var hbs = require('hbs');
var methodOverride = require('method-override');
var path = require('path');

var normalRoutes= require('./routes/normalRoutes');
var apiRoutes = require('./routes/apiRoutes');
require('./db'); // execute connect

var app = express();

app.use(express.urlencoded({extended: false}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views", "pages"));
app.set("view options", { layout: "../layouts/default" });

app.use(methodOverride('_method'));

app.use(normalRoutes);
app.use(apiRoutes);

app.listen('3000', function () {
    console.log("Server started");
})
