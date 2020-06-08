var fs = require('fs');
var path = require('path');

var likesJSONPath = path.join(__dirname, '../', 'likes.json');

function authentilike(req, res, next) {
    var likeId = req.header('Authorization');

    if(likeId) {
        fs.readFile(likesJSONPath , {encoding : 'utf-8'} , function(err , likes){
            if(err) {
                console.log(err.message)
                return res.status(500).send('Server Error')
            }

            var likesJavascript = JSON.parse(likes);

            var like = likesJavascript.find(function(like){
                return like.id === likeId;
            })
            if(like === undefined) {
                return res.status(404).send('like not found');
            }
            else {
                req.likesJavascript = likesJavascript;
                req.like = like;
                next();
            }
        })
    } else return res.status(401).send('Invalid Credentials');
}

module.exports = authentilike;