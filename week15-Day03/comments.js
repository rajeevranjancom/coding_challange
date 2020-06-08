const axios = require('axios');


axios.get('http://jsonplaceholder.typicode.com/comments')
.then((res) => {
    //console.log(typeof res);
    let data = res.data.slice(0,20).map((item) => {
        item = {id :item.postId,body :item.body}
        return item;
    })
    
    let filtered = data.filter((item) => {
        //console.log(item.body.length)
        return item.body.length<=150;
    })
    //console.log(filtered)
    let reduced = data.reduce((accum, item) => {
        if (accum[item.id] !== undefined) {accum[item.id]++}
        else {accum[item.id] = 1}
        return accum;
    }, {});
    console.log(reduced)
});
