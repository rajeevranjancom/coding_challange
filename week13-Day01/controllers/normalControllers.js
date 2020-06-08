var Fish = require('../model/fish');

var renderController = {};

renderController.addFish = function (req,res) {
    res.render('addFish');
}

renderController.getFishes = function (req,res) {
    Fish.find()
    .then(function (fishes) {
        res.render('displayFishes', {fishes});
    })
}

renderController.updateFish = function (req,res) {
    Fish.findOne({_id : req.params.fishId})
    .then(function (fish) {
        res.render('updateFish', {fish});
    })
}
module.exports = renderController;