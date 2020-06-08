const express = require("express");
const uuid = require("uuid/v4");
const fs = require("fs");
const path = require("path");
const authenticate = require("../middleware/authenticate");
const authenticomt = require("../middleware/commentAuthenticate");

let commentJSONPath = path.join(__dirname, "../comment.json");
let likesJSONPath = path.join(__dirname, "../like.json");

let router1 = express.Router();

router1.post("/comment", authenticate, function(req, res) {
  let post = req.post.id;
  let comment = req.body;

  let id = uuid();

  fs.readFile(commentJSONPath, { encoding: "utf-8" }, function(err, comments) {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }

    let commentJavascript = JSON.parse(comments);

    let commentObj = {
      id: id,
      comment: comment.comment,
      postID: post
    };

    commentJavascript.push(commentObj);

    let commentJSON = JSON.stringify(commentJavascript);

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
  });
});

router1.get("/comment/:commentId", authenticomt, function(req, res) {
  return res.json(req.comment);
});

router1.patch("/comment/:commentId", authenticomt, function(req, res) {
  let newComment = req.body;

  for (let key in req.comment) {
    if (newComment.hasOwnProperty(key)) {
      req.comment[key] = newComment[key];
    }
  }
  let commentJSON = JSON.stringify(req.commentsJavascript);

  fs.writeFile(commentJSONPath, commentJSON, function(err) {
    if (err) return res.status(500).send("Server error");
    res.status(202).json(req.comment);
  });
});

router1.delete("/comment/:commentId", authenticomt, function(req, res) {
  let commentId = req.params.commentId;

  fs.readFile(commentJSONPath, { encoding: "utf-8" }, function(err, comments) {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }

    let commentsJavascript = JSON.parse(comments);

    let comment = commentsJavascript.findIndex(function(comment) {
      return comment.id === commentId;
    });
    if (comment === -1) {
      return res.status(404).send("comment not found");
    } else {
      let commenting = commentsJavascript[comment];

      commentsJavascript.splice(comment, 1);

      let commentsJSON = JSON.stringify(commentsJavascript);

      fs.writeFile(commentJSONPath, commentsJSON, function(err) {
        if (err) return res.status(500).send("Server error");
        res.status(202).json(commenting);
      });
    }
  });

  fs.readFile(likesJSONPath, { encoding: "utf-8" }, function(err, likes) {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }

    let likesJavascript = JSON.parse(likes);

    let like = likesJavascript.findIndex(function(like) {
      return like.commentID === commentId;
    });
    if (like === -1) {
      return res.status(404).send("like not found");
    } else {
      let liked = likesJavascript[like];

      likesJavascript.splice(like, 1);

      let likesJSON = JSON.stringify(likesJavascript);

      fs.writeFile(likesJSONPath, likesJSON, function(err) {
        if (err) return res.status(500).send("Server error");
        res.status(202).json(liked);
      });
    }
  });
});
module.exports = router1;
