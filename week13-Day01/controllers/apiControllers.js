var Fish = require('../model/fish');
var mongoose = require('mongoose')

var apiController = {};

apiController.createFish = function (req,res) {
    
    var fish = {
        name : req.body.name,
        type : req.body.type,
        color : req.body.color
    };
    if (req.body.size) fish.size = parseInt(req.body.size);
    var fish = new Fish(fish);
    fish.save()
    .then(function (fish) {
        res.redirect('/fish');
    })
}

apiController.updateFish = function (req,res) {
    var fishId = req.params.fishId;
    var updatedFish = req.body;
    var setFields = {};
    Fish.findOne({name : updatedFish.name})
    .then(function (fish) {
        if (!fish) setFields.name = updatedFish.name;
    })
    .then(function () {
        return Fish.findOne({_id : fishId});
    })
    .then(function (fish) {
        if (fish.type !== updatedFish.type) setFields.type = updatedFish.type;
        if (fish.color !== updatedFish.color) setFields.color = updatedFish.color;
        if (fish.size != updatedFish.size) setFields.size = updatedFish.size;
        console.log(setFields)
        return Fish.updateOne({_id : fish._id}, setFields);
    })
    .then(function (upFish) {
        console.log(upFish)
        res.redirect('/fish');
    })
}

apiController.deleteFish = function (req,res) {
    var fishId = req.params.fishId;
    Fish.deleteOne({_id : fishId})
    .then(function () {
        res.redirect('/fish');
    })
}

module.exports = apiController;