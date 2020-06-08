var fs = require('fs');
var path = require('path');

var commentJSONPath = path.join(__dirname, '../', 'comments.json');

function authenticomt(req, res, next) {
    var userToken = req.header('Authorization');

    if(userToken) {
        fs.readFile(commentJSONPath , {encoding : 'utf-8'} , function(err , comments){
            if(err) {
                console.log(err.message)
                return res.status(500).send('Server Error')
            }

            var commentsJavascript = JSON.parse(comments);

            var comment = commentsJavascript.find(function(comment){
                console.log(comment.id)
                return comment.id === userToken;
            })
            if(comment === undefined) {
                return res.status(404).send('comment not found');
            }
            else {
                req.commentsJavascript = commentsJavascript;
                req.comment = comment;
                next();
            }
        })
    } else return res.status(401).send('Invalid Credentials');
}

module.exports = authenticomt;