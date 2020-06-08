var express = require('express');
var morgon = require('morgan');
var postsRoutes = require('./routes/posts');
var commentRoutes = require('./routes/comments');
var likesRoutes = require('./routes/likes');
var userRoutes =require('./routes/users')

var app = express();

app.use(morgon('dev'));
app.use(express.json());
app.use(postsRoutes)
app.use(commentRoutes)
app.use(likesRoutes)
app.use(userRoutes)



app.listen(8080);
