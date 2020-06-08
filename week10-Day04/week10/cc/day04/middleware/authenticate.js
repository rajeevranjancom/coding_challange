//importing all the required modules
const fs = require("fs");
const path = require("path");

//creating variables for the path of the json files to hook up to the middleware
let postsJSONPath = path.join(__dirname, "../", "post.json");

//creating the authentication middleware functions for the routes

//post function authentication middleware
function postAuthenticate(req, res, next) {
  let authId = req.header("Authorization");

  if (authId) {
    fs.readFile(postsJSONPath, { encoding: "utf-8" }, function(err, posts) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var postsJavascript = JSON.parse(posts);
      var post = postsJavascript.find(function(post) {
        return post.id === authId;
      });
      if (post === undefined) {
        return res.status(404).send("post not found");
      } else {
        req.postsJavascript = postsJavascript;
        req.post = post;
        next();
      }
    });
  } else return res.status(401).send("Invalid");
}

//exporting the middleware module
module.exports = postAuthenticate;
