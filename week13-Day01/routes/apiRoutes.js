var express = require('express');
var router = express.Router();

var {createFish,updateFish,deleteFish} = require('../controllers/apiControllers');

router.post('/fish', createFish);
router.patch('/fish/:fishId', updateFish);
router.delete('/fish/:fishId', deleteFish);

module.exports = router;