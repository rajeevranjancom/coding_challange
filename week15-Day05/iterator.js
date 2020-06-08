const fs = require('fs');

let data;

fs.readFile(`${__dirname}/data.json`, {encoding:'utf-8'}, function (err,res) {
    data = JSON.parse(res);
    
    data[Symbol.iterator] = function* () {
        const keys = Object.keys(this);
        let index = 0;
        let limit = keys.length;
        let data = this;
        while (index<limit){
            yield 'Post Id : '+data[keys[index]].id+' --- Title : '+data[keys[index]].title;
            index++;
        }
    }
    
    for (const post of data) {
        console.log(post)
    }
});




