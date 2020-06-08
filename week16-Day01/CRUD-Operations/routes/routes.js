const {Router} = require("express");
const router = Router();
const {addData,fetchData, updateData, deleteData} = require("../controllers/controller") 

//------------------CRUD Operation Routes------------------------

router.post(`/user/add/data`, addData)
router.get(`/user/fetch/data`, fetchData)
router.patch(`/user/update/data`, updateData)
router.delete(`/user/delete/data`, deleteData)

module.exports = router;