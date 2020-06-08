const express = require("express");
const uuid = require("uuid/v4");
const fs = require("fs");
const path = require("path");
 const authenticomt = require("../middleware/authenticate");
const authentilike = require("../middleware/likeAuthenticate");

let likesJSONPath = path.join(__dirname, "../like.json");

let router2 = express.Router();

router2.post("/like", authenticomt, function(req, res) {
  let comment = req.comment.id;
  let post = req.comment.postID;
  let like = req.body;

  let id = uuid();

  fs.readFile(likesJSONPath, { encoding: "utf-8" }, function(err, likes) {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }

    let likesJavascript = JSON.parse(likes);

    let likesObj = {
      id: id,
      commentID: comment,
      postID: post,
      liked: like.hasOwnProperty("liked") ? like.liked : false
    };

    likesJavascript.push(likesObj);

    let likesJSON = JSON.stringify(likesJavascript);

    fs.writeFile(likesJSONPath, likesJSON, function(err) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }
      res
        .status(201)
        .json({ statusCode: 201, id: id, message: "liked Successfully" });
    });
  });
});

router2.delete("/like/:likeId", authentilike, function(req, res) {
  let likeId = req.params.likeId;

  fs.readFile(likesJSONPath, { encoding: "utf-8" }, function(err, likes) {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }

    let likesJavascript = JSON.parse(likes);

    let like = likesJavascript.findIndex(function(like) {
      return like.id === likeId;
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

module.exports = router2;
