const fs = require("fs");
const path = require("path");

const likesJSONPath = path.join(__dirname, "../", "like.json");

function likeAuthenticate(req, res, next) {
  let likeId = req.header("Authorization");

  if (likeId) {
    fs.readFile(likesJSONPath, { encoding: "utf-8" }, function(err, likes) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      let likesJavascript = JSON.parse(likes);

      var like = likesJavascript.find(function(like) {
        return like.id === likeId;
      });
      if (like === undefined) {
        return res.status(404).send("like not found");
      } else {
        req.likesJavascript = likesJavascript;
        req.like = like;
        next();
      }
    });
  } else return res.status(401).send("Invalid Credentials");
}

module.exports = likeAuthenticate;
