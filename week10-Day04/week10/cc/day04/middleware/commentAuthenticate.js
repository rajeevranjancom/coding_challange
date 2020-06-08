//importing all the required modules
const fs = require("fs");
const path = require("path");

//creating variables for the path of the json files to hook up to the middleware
let commentJSONPath = path.join(__dirname, "../", "comment.json");

//creating the authentication middleware functions for the routes

//post function authentication middleware
function commentAuthenticate(req, res, next) {
  let commentId = req.header("Authorization");

  if (commentId) {
    fs.readFile(commentJSONPath, { encoding: "utf-8" }, function(
      err,
      comments
    ) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      let commentsJavascript = JSON.parse(comments);

      let comment = commentsJavascript.find(function(comment) {
        return comment.id === commentId;
      });
      if (comment === undefined) {
        return res.status(404).send("comment not found");
      } else {
        req.commentsJavascript = commentsJavascript;
        req.comment = comment;
        next();
      }
    });
  } else return res.status(401).send("Invalid Credentials");
}

//exporting the middleware module
module.exports = commentAuthenticate;
