let express = require("express");
let session = require("express-session");
let methodOverride = require("method-override");
let users = require("./users");
let middlewares = require("./middleware");
let fs = require("fs");
let path = require("path");
let userJSONPath = path.join(__dirname, "users.json");
let uuid = require("uuid/v4");

let app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(
  session({
    name: "users",
    secret: "sriksha",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 10,
      secure: false
    }
  })
);

app.get("/", (req, res)=> {
  res.send("Hello world");
});
app.get("/register", (req, res)=> {
  const formString1 = `
      <form action='/register' method='POST'>
        <input required type='name' name='name' placeholder='Enter your name' />
        <input required type='email' name='email' placeholder='Enter your email' />
        <input required type='password' name='password' placeholder='Enter your password' />
        <input type='submit' value='register' />
      </form>
    `;
  res.send(formString1);
});
app.post("/register", (req, res)=> {
  var id = uuid();
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  fs.readFile(userJSONPath, { encoding: "utf-8" }, (err, users)=> {
    console.log(users);
    var usersJavascript = JSON.parse(users);
    var userObj = {
      id: id,
      name: name,
      email: email,
      password: password
    };
    req.session.userId = userObj.id;
    console.log(userObj);
    usersJavascript.push(userObj);
    var usersJSON = JSON.stringify(usersJavascript);
    fs.writeFile("./users.json", usersJSON);
    return res.redirect("/dashboard");
  });
});
app.get("/login", function(req, res) {
  const formString = `
    <form action='/login' method='POST'>
      <input required type='email' name='email' placeholder='Enter your email' />
      <input required type='password' name='password' placeholder='Enter your password' />
      <input type='submit' value='Login' />
    </form>
  `;
  res.send(formString);
});

app.post("/login", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  if (!email || !password) return res.redirect("/login");
  fs.readFile(userJSONPath, { encoding: "utf-8" }, function(err, users) {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
    var usersJavascript = JSON.parse(users);
    var user = usersJavascript.find(function(user) {
      return user.email === email && user.password === password;
    });
    if (!user) return res.redirect("/login");
    req.session.userId = user.id;
    return res.redirect("/dashboard");
  });
});
app.get("/dashboard", middlewares.authenticate, function(req, res) {
  fs.readFile(userJSONPath, { encoding: "utf-8" }, function(err, users) {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
    var usersJavascript = JSON.parse(users);
    var user = usersJavascript.find(function(users) {
      return req.session.userId === users.id;
    });
    var dashboard = `
    <h1>Hello ${user.name}</h1>
    <form method='POST' action='/logout?_method=DELETE'>
      <input type='submit' value='Logout' />
    </form>
  `;
    res.send(dashboard);
  });
});

app.delete("/logout", function(req, res) {
  req.session.destroy();
  return res.redirect("/login");
});

app.listen(1111, function() {
  console.log("Server started");
});
