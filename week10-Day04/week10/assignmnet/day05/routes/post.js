var express = require("express");
var uuid = require("uuid/v4");
var fs = require("fs");
var path = require("path");
var authenticate = require("../middleware/authenticate");
var authentiuser = require("../middleware/authentiuser");

var usersJSONPath = path.join(__dirname, "../users.json");
var postsJSONPath = path.join(__dirname, "../posts.json");
var commentJSONPath = path.join(__dirname, "../comments.json");
var likesJSONPath = path.join(__dirname, "../likes.json");

var router = express.Router();

router.post("/posts", authentiuser, function(req, res) {
  var post = req.body;
  var userid = req.user.id;
  //var userToken = req.user.token;
  var admin = req.user.isAdmin;

  if (admin === false) {
    return res.status(404).send("Youre not Admin");
  } else {
    var id = uuid();

    fs.readFile(postsJSONPath, { encoding: "utf-8" }, function(err, posts) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var postsJavascript = JSON.parse(posts);

      var postsObj = {
        id: id,
        user: userid,
        //userToken: userToken,
        title: post.title,
        body: post.body,
        createdAt: new Date()
      };

      postsJavascript.push(postsObj);

      var postsJSON = JSON.stringify(postsJavascript);

      fs.writeFile("./posts.json", postsJSON, function(err) {
        if (err) {
          console.log(err.message);
          return res.status(500).send("Server Error");
        }
        res.status(201).json({
          statusCode: 201,
          id: id,
          message: "Post Successfully uploaded"
        });
      });
      fs.readFile(usersJSONPath, { encoding: "utf-8" }, function(err, users) {
        if (err) {
          return res.status(500).send("Server Error");
        }
        var usersJavascript = JSON.parse(users);
        var users = usersJavascript.filter(function(user) {
          if (user.id == userid) {
            user.post.push(id);
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

router.get("/posts/:postId", authentiuser, function(req, res) {
  var postId = req.params.postId;
  var admin = req.user.isAdmin;

  if (admin === false) {
    return res, status(404).send("Youre not Admin");
  } else {
    fs.readFile(postsJSONPath, { encoding: "utf-8" }, function(err, posts) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var postsJavascript = JSON.parse(posts);

      var post = postsJavascript.find(function(post) {
        return post.id === postId;
      });

      if (post === undefined)
        return res
          .status(404)
          .send({ statusCode: 404, message: "Post not found" });

      return res.json(post);
    });
  }
});

router.patch("/posts/:postId", authentiuser, function(req, res) {
  var newPost = req.body;
  var postId = req.params.postId;
  var admin = req.user.isAdmin;

  if (admin === false) {
    return res, status(404).send("Youre not Admin");
  } else {
    fs.readFile(postsJSONPath, { encoding: "utf-8" }, function(err, posts) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var postsJavascript = JSON.parse(posts);

      var post = postsJavascript.find(function(post) {
        return post.id === postId;
      });

      if (post === undefined)
        return res
          .status(404)
          .send({ statusCode: 404, message: "Post not found" });
      else {
        for (var key in post) {
          if (newPost.hasOwnProperty(key)) {
            post[key] = newPost[key];
          }
        }

        var postsJSON = JSON.stringify(postsJavascript);
        fs.writeFile(postsJSONPath, postsJSON, function(err) {
          if (err) return res.status(500).send("Server error");
          res.status(202).json(post);
        });
      }
    });
  }
});

router.delete("/posts/:postId", authentiuser, function(req, res) {
  var admin = req.user.isAdmin;
  var postId = req.params.postId;
  var userid = req.user.id;

  if (admin === false) {
    return res, status(404).send("Youre not Admin");
  } else {
    fs.readFile(postsJSONPath, { encoding: "utf-8" }, function(err, posts) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var postsJavascript = JSON.parse(posts);

      var post = postsJavascript.findIndex(function(post) {
        return post.id === postId;
      });
      if (post === -1) {
        return res.status(404).send("post not found");
      } else {
        var posting = postsJavascript[post];

        postsJavascript.splice(post, 1);

        var postsJSON = JSON.stringify(postsJavascript);

        fs.writeFile(postsJSONPath, postsJSON, function(err) {
          if (err) return res.status(500).send("Server error");
          return res.status(202).json(posting);
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
          post = user.post.filter(item => item !== postId);
          return (user.post = post);
        }
      });

      var userJSON = JSON.stringify(users);
      fs.writeFile("./users.json", userJSON, function(err) {
        if (err) {
          console.log(err.message);
        }
      });
    });

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
        return comment.postID === postId;
      });
      if (comment === -1) {
        return res.status(404).send("comment not found");
      } else {
        var commenting = commentsJavascript[comment];

        commentsJavascript.splice(comment, 1);

        var commentsJSON = JSON.stringify(commentsJavascript);

        fs.writeFile(commentJSONPath, commentsJSON, function(err) {
          if (err) return res.status(500).send("Server error");
          return res.status(202).json(commenting);
        });
      }
    });

    fs.readFile(likesJSONPath, { encoding: "utf-8" }, function(err, likes) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var likesJavascript = JSON.parse(likes);

      var like = likesJavascript.findIndex(function(like) {
        return like.postID === postId;
      });
      if (like === -1) {
        return res.status(404).send("like not found");
      } else {
        var liked = likesJavascript[like];

        likesJavascript.splice(like, 1);

        var likesJSON = JSON.stringify(likesJavascript);

        fs.writeFile(likesJSONPath, likesJSON, function(err) {
          if (err) return res.status(500).send("Server error");
          return res.status(202).json(liked);
        });
      }
    });
  }
});

module.exports = router;
