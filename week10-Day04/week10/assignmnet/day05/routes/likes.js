var express = require("express");
var uuid = require("uuid/v4");
var fs = require("fs");
var path = require("path");
var authenticomt = require("../middleware/authenticomt");
var authentilike = require("../middleware/authentilike");
var authentiuser = require("../middleware/authentiuser");

var usersJSONPath = path.join(__dirname, "../users.json");
var likesJSONPath = path.join(__dirname, "../likes.json");

var likesrouter = express.Router();

likesrouter.post("/likes", [authentiuser, authenticomt], function(req, res) {
  var comment = req.comment.id;
  var post = req.comment.postID;
  var like = req.body;
  var userid = req.user.id;
  var admin = req.user.isAdmin;
  //var userToken = req.user.token;

  var id = uuid();
  if (admin === false) {
    return res.status(404).send("Youre not Admin");
  } else {
    fs.readFile(likesJSONPath, { encoding: "utf-8" }, function(err, likes) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var likesJavascript = JSON.parse(likes);

      var likesObj = {
        id: id,
        user: userid,
        //userToken: userToken,
        commentID: comment,
        postID: post,
        liked: like.hasOwnProperty("liked") ? like.liked : false
      };

      likesJavascript.push(likesObj);

      var likesJSON = JSON.stringify(likesJavascript);

      fs.writeFile(likesJSONPath, likesJSON, function(err) {
        if (err) {
          console.log(err.message);
          return res.status(500).send("Server Error");
        }
        res
          .status(201)
          .json({ statusCode: 201, id: id, message: "liked Successfully" });
      });

      fs.readFile(usersJSONPath, { encoding: "utf-8" }, function(err, users) {
        if (err) {
          return res.status(500).send("Server Error");
        }
        var usersJavascript = JSON.parse(users);
        var users = usersJavascript.filter(function(user) {
          if (user.id == userid) {
            user.likes.push(id);
          }
          return user;
        });
        var userJSON = JSON.stringify(users);
        fs.writeFile("./users.json", userJSON, function(err) {
          if (err) {
            console.log(err.message);
          }
        });
      });
    });
  }
});

likesrouter.delete("/likes/:likeId", [authentiuser, authentilike], function(
  req,
  res
) {
  var likeId = req.params.likeId;
  var userid = req.user.id;
  var admin = req.user.isAdmin;

  if (admin === false) {
    return res, status(404).send("Youre not Admin");
  } else {
    fs.readFile(likesJSONPath, { encoding: "utf-8" }, function(err, likes) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var likesJavascript = JSON.parse(likes);

      var like = likesJavascript.findIndex(function(like) {
        return like.id === likeId;
      });
      if (like === -1) {
        return res.status(404).send("like not found");
      } else {
        var liked = likesJavascript[like];

        likesJavascript.splice(like, 1);

        var likesJSON = JSON.stringify(likesJavascript);

        fs.writeFile(likesJSONPath, likesJSON, function(err) {
          if (err) return res.status(500).send("Server error");
          res.status(202).json(liked);
        });
      }
    });

    fs.readFile(usersJSONPath, { encoding: "utf-8" }, function(err, users) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }
      var usersJavascript = JSON.parse(users);

      var users = usersJavascript.filter(function(user) {
        if (user.id == userid) {
          likes = user.likes.filter(item => item !== likeId);
          return (user.likes = likes);
        }
      });

      var userJSON = JSON.stringify(users);
      fs.writeFile("./users.json", userJSON, function(err) {
        if (err) {
          console.log(err.message);
        }
      });
    });
  }
});

module.exports = likesrouter;
