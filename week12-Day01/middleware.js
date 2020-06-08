var fs = require('fs')
var path = require('path');
var userJSONPath = path.join(__dirname, 'users.json');

module.exports = {
    authenticate: function(req, res, next) {
      // Since the cookie has been already reached. He/She must have the userID as a property to the session.
      if (!req.session.userId) return res.redirect("/login");
      
      next();
    }

}
  