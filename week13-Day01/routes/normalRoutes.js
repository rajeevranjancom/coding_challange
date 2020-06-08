var express = require('express');
var router = express.Router();

var {addFish,getFishes,updateFish} = require('../controllers/normalControllers');

router.get('/', addFish);
router.get('/fish', getFishes);
router.get('/fish/:fishId', updateFish);

module.exports = router;