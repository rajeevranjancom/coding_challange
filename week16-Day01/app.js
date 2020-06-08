const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require('./db')

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())
//----------------------------




//-------------All Routes-----------------------
app.use(require('./CRUD-Operations/routes/routes'))

module.exports = app