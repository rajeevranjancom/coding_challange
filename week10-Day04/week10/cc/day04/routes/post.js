//importing all the required modules
const express = require("express");
const uuid = require("uuid/v4");
const fs = require("fs");
const path = require("path");
const auth = require("../middleware/authenticate");

//fetching the path of the .json files to read and write
const pathPostJson = path.join(__dirname, "../post.json");
const commentJSONPath = path.join(__dirname, "../comment.json");
const likesJSONPath = path.join(__dirname, "../like.json");

//setting up the connection with the router folder and files
var router = express.Router();

//setting up the function to manipulate the post.json file
router.post("/post", function(req, res) {
  let post = req.body;
  let id = uuid();

  //reading the post.json file
	fs.readFile(pathPostJson, { encoding: 'utf-8' }, function(err, posts) {
		if (err) {
			console.log(err.message);
			return res.status(500).send('Server Error');
		}

		var postsJavascript = JSON.parse(posts);

		var postsObj = {
			id: id,
			title: post.title,
			body: post.body,
			createdAt: new Date()
		};

		postsJavascript.push(postsObj);

		var postsJSON = JSON.stringify(postsJavascript);

		fs.writeFile('./post.json', postsJSON, function(err) {
			if (err) {
				console.log(err.message);
				return res.status(500).send('Server Error');
			}
			res.status(201).json({ statusCode: 201, id: id, message: 'Post Successfully uploaded' });
		});
	});
});
router.get("/post/:postID", auth, function(req, res) {
  return res.json(req.post);
});
router.patch("/post/:postID", auth, function(req, res) {
  let newPost = req.body;
  for (let key in req.post) {
    if (newPost.hasOwnProperty(key)) {
      req.post[key] = newPost[key];
    }
  }
  let postJson = JSON.stringify(postJs);
  fs.writeFile("./post.json", postJson, function(err) {
    if (err) return res.status(500).send("Server error");
    res.status(202).json(req.post);
  });
});
router.delete("/post/:posrtID", auth, function(req, res) {
  let postId = req.params.postID;

  fs.readFile(pathPostJson, { encoding: "utf-8" }, function(err, post) {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
    let postJs = JSON.parse(post);
    let post1 = postJs.findIndex(function(post) {
      return post.id === postId;
    });
    if (post1 === -1) {
      return res.status(404).send("post not found");
    } else {
      let posting = postsJs[post];

      postsJs.splice(post, 1);

      let postsJSON = JSON.stringify(postsJs);
      fs.writeFile(pathPostJson, postsJSON, function(err) {
        if (err) return res.status(500).send("Server error");
        res.status(202).json(posting);
      });
    }
  });
  //start of comment
  fs.readFile(commentJSONPath, { encoding: "utf-8" }, function(err, comments) {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }

    let commentsJavascript = JSON.parse(comments);

    let comment = commentsJavascript.findIndex(function(comment) {
      return comment.postID === postId;
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
  //start of like
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
        res.status(202).json(liked);
      });
    }
  });
});
module.exports = router;
