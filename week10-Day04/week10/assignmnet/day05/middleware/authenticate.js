var fs = require('fs');
var path = require('path');

var postsJSONPath = path.join(__dirname, '../', 'posts.json');

function authenticate(req, res, next) {
    var authId = req.params;

    if(authId) {
        fs.readFile(postsJSONPath , {encoding : 'utf-8'} , function(err , posts){
            if(err) {
                console.log(err.message)
                return res.status(500).send('Server Error')
            }

            var postsJavascript = JSON.parse(posts);

            var post = postsJavascript.find(function(post){
                return post.id === authId;
            })
            if(post === undefined) {
                return res.status(404).send('post not found');
            }
            else {
                req.postsJavascript = postsJavascript;
                req.post = post;
                next();
            }
        })
    } else return res.status(401).send('Invalid Credentials');
}

module.exports = authenticate;