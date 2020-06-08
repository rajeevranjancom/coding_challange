var fs = require("fs");
var path = require("path");
var jwt = require("jsonwebtoken");

var usersJSONPath = path.join(__dirname, "../", "users.json");
var privateKey = require("../passwords/passwords");

function authentiuser(req, res, next) {
  var authToken = req.header("Authorization");
  if (authToken) {
    fs.readFile(usersJSONPath, { encoding: "utf-8" }, function(err, users) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }

      var usersJavascript = JSON.parse(users);

      var user = usersJavascript.find(function(user) {
        return user.id === authToken;
      });
      if (user === undefined) {
        return res.status(404).send("user not found");
      } else {
        jwt.verify(user.token, "Tejas", function(err, payload) {
          if (err) {
            console.log(err.message);
            return res.status(401).send("Invalid credentials");
          } else {
            req.usersJavascript = usersJavascript;
            req.user = user;
            console.log("midleware 1 executed");
            next();
          }
        });
      }
    });
  } else return res.status(401).send("Invalid Credentials");
}

module.exports = authentiuser;
