var express = require("express");
var uuid = require("uuid/v4");
var fs = require("fs");
var path = require("path");
var authenticate = require("../middleware/authenticate");
var authenticomt = require("../middleware/authenticomt");
var authentiuser = require("../middleware/authentiuser");

var usersJSONPath = path.join(__dirname, "../users.json");
var commentJSONPath = path.join(__dirname, "../comments.json");
var likesJSONPath = path.join(__dirname, "../likes.json");

var router1 = express.Router();

router1.post("/comments/:postId", [authentiuser, authenticate], function(
  req,
  res
) {
  var post = req.post.id;
  var userid = req.user.id;
  var comment = req.body;
  var admin = req.user.isAdmin;
  //var userToken = req.user.token;

  var id = uuid();

  if (admin === false) {
    return res.status(404).send("Youre not Admin");
  } else {
    fs.readFile(commentJSONPath, { encoding: "utf-8" }, function(
      err,
      comments
    ) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var commentJavascript = JSON.parse(comments);

      var commentObj = {
        id: id,
        user: userid,
        //userToken: userToken,
        comment: comment.comment,
        postID: post
      };

      commentJavascript.push(commentObj);

      var commentJSON = JSON.stringify(commentJavascript);

      fs.writeFile(commentJSONPath, commentJSON, function(err) {
        if (err) {
          console.log(err.message);
          return res.status(500).send("Server Error");
        }
        res
          .status(201)
          .json({
            statusCode: 201,
            id: id,
            message: "comment Successfully uploaded"
          });
      });

      fs.readFile(usersJSONPath, { encoding: "utf-8" }, function(err, users) {
        if (err) {
          return res.status(500).send("Server Error");
        }
        var usersJavascript = JSON.parse(users);
        var users = usersJavascript.filter(function(user) {
          if (user.id == userid) {
            user.comment.push(id);
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

router1.get("/comments/:commentId", authentiuser, function(req, res) {
  var commentId = req.params.commentId;
  var admin = req.user.isAdmin;

  if (admin === false) {
    return res, status(404).send("Youre not Admin");
  } else {
    fs.readFile(commentJSONPath, { encoding: "utf-8" }, function(
      err,
      comments
    ) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var commentsJavascript = JSON.parse(comments);

      var comment = commentsJavascript.find(function(comment) {
        return comment.id === commentId;
      });
      if (comment === undefined)
        return res
          .status(404)
          .send({ statusCode: 404, message: "Comment not found" });
      return res.json(comment);
    });
  }
});

router1.patch("/comments/:commentId", authentiuser, function(req, res) {
  var newComment = req.body;
  var commentId = req.params.commentId;
  var admin = req.user.isAdmin;

  if (admin === false) {
    return res, status(404).send("Youre not Admin");
  } else {
    fs.readFile(commentJSONPath, { encoding: "utf-8" }, function(
      err,
      comments
    ) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var commentsJavascript = JSON.parse(comments);

      var comment = commentsJavascript.find(function(comment) {
        return comment.id === commentId;
      });
      for (var key in comment) {
        if (newComment.hasOwnProperty(key)) {
          comment[key] = newComment[key];
        }
      }
      var commentJSON = JSON.stringify(commentsJavascript);

      fs.writeFile(commentJSONPath, commentJSON, function(err) {
        if (err) return res.status(500).send("Server error");
        res.status(202).json(comment);
      });
    });
  }
});

router1.delete("/comments/:commentId", [authentiuser, authenticomt], function(
  req,
  res
) {
  var commentId = req.params.commentId;
  var userid = req.user.id;
  var admin = req.user.isAdmin;

  if (admin === false) {
    return res, status(404).send("Youre not Admin");
  } else {
    fs.readFile(commentJSONPath, { encoding: "utf-8" }, function(
      err,
      comments
    ) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var commentsJavascript = JSON.parse(comments);

      var comment = commentsJavascript.findIndex(function(comment) {
        return comment.id === commentId;
      });
      if (comment === -1) {
        return res.status(404).send("comment not found");
      } else {
        var commenting = commentsJavascript[comment];

        commentsJavascript.splice(comment, 1);

        var commentsJSON = JSON.stringify(commentsJavascript);

        fs.writeFile(commentJSONPath, commentsJSON, function(err) {
          if (err) return res.status(500).send("Server error");
          res.status(202).json(commenting);
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
          comment = user.comment.filter(item => item !== commentId);
          return (user.comment = comment);
        }
      });

      var userJSON = JSON.stringify(users);
      fs.writeFile("./users.json", userJSON, function(err) {
        if (err) {
          console.log(err.message);
        }
      });
    });

    fs.readFile(likesJSONPath, { encoding: "utf-8" }, function(err, likes) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var likesJavascript = JSON.parse(likes);

      var like = likesJavascript.findIndex(function(like) {
        return like.commentID === commentId;
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
  }
});
module.exports = router1;
