//importing all the required modules
const express = require("express");
const morgan = require("morgan");
const postRoute = require('./routes/post')
const commentRoute = require("./routes/comment");
const likeRoute = require("./routes/likes");

//creating an instance of the express module
const app = express();

// //wiring all the rquired middleware and route modules in the server
app.use(express.json());
app.use(postRoute);
app.use(commentRoute);
app.use(likeRoute);
app.use(morgan("dev"));

//sending first response from the server to check if the server has started
app.get("/", function(req, res) {
  res.send("Server Started");
});

app.listen(8080);
