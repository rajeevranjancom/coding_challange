var express = require('express');
var uuid = require('uuid/v4');
var jwt = require('jsonwebtoken');
var bcryt = require('bcryptjs');
var path = require('path');
var morgan = require('morgan');
var fs = require('fs');
var passords = require('../passwords/passwords');
var authenticate = require('../middleware/authenticate');
var authenticomt = require('../middleware/authenticomt');
var authentiuser = require('../middleware/authentiuser');

var privateKey = passords.privateKey;

var userJSONPath = path.join(__dirname, '../', 'users.json');

var userroute = express.Router();

userroute.post('/users/register', function(req, res) {
	var user = req.body;

	bcryt.hash(user.password, 10).then(function(hashedPassword) {
		var id = uuid();

		jwt.sign({ id: id }, privateKey, { expiresIn: 60 * 60 * 1 }, function(err, token) {
			if (err) {
				console.log(err.message);
				return res.status(500).send('Server Error');
			}
			fs.readFile(userJSONPath, { encoding: 'utf-8' }, function(err, users) {
				if (err) {
					console.log(err.message);
					return res.status(500).send('Server Error');
				}

				var usersJavascript = JSON.parse(users);

				var userObj = {
					id: id,
					name: user.name,
					email: user.email,
					post: [],
					comment: [],
					likes: [],
					password: hashedPassword,
					token: token,
					isAdmin: user.hasOwnProperty('isAdmin') ? user.isAdmin : false
				};

				usersJavascript.push(userObj);

				var usersJSON = JSON.stringify(usersJavascript);

				fs.writeFile('./users.json', usersJSON, function(err) {
					if (err) {
						console.log(err.message);
						return res.status(500).send('Server Error');
					}
					res
						.status(201)
						.json({ statusCode: 201, id: id, token: token, message: 'User Successfully Registered' });
				});
			});
		});
	});
});

userroute.post('/users/login', function(req, res) {
	fs.readFile(userJSONPath, { encoding: 'utf-8' }, function(err, users) {
		if (err) {
			console.log(err.message);
			return res.status(500).send('Server Error');
		}
		var usersJavascript = JSON.parse(users);
		var user = usersJavascript.find(function(user) {
			return user.email === req.body.email;
		});
		if (user === undefined) {
			return res.status(401).send('You have not been registered. Register first.');
		}
		bcryt
			.compare(req.body.password, user.password)
			.then(function(isMatched) {
				if (isMatched === true) {
					jwt.sign({ id: user.id }, privateKey , { expiresIn: 60 * 60 * 1 }, function(err, token) {
						if (err) {
							console.log(err.message);
							return res.status(500).send('Server Error');
						}
                        user.token = token;
						var usersJSON = JSON.stringify(usersJavascript);
						fs.writeFile(userJSONPath, usersJSON, function(err) {
							if (err) {
								console.log(err.message);
								return res.status(500).send('Server Error');
							}
							res.status(200).json({ statusCode: 200, token: token });
						});
					});
				} else return res.status(401).send('Invalid credentials');
			})
			.catch(function(err) {
				return res.status(500).send('Server error');
			});
	});
});

userroute.delete('/users/logout', authentiuser, function(req, res) {
	var user = req.user;

	user.token = null;
	fs.readFile(userJSONPath, { encoding: 'utf-8' }, function(err, users) {
		if (err) return res.status(500).send('Server Error');
		var usersJavascript = JSON.parse(users);

		var userIndex = usersJavascript.findIndex(function(userObj) {
			return userObj.id === user.id;
		});

		usersJavascript[userIndex] = { ...user };

		var usersJSON = JSON.stringify(usersJavascript);

		fs.writeFile(userJSONPath, usersJSON, function(err) {
			if (err) {
				console.log(err.message);
				return res.status(500).send('Server Error');
			}
			res.send('Logged out successfully');
		});
	});
});

module.exports = userroute;
