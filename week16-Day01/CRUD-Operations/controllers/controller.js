const classRoom = require("../models/classRoom")

module.exports = {
    async addData(req, res){
    try {
        const classEntry = await classRoom.create({...req.body});
        console.log("Data Saved Successfully...");
        res.status(202).send("Entry saved successfully");
    } catch (error) {
       return res.status(500).send(error.message)
    }
},
async fetchData(req, res){
    try {
        const classEntry = await classRoom.findAll()
        return res.status(200).json({classEntry: classEntry})
    } catch (error) {
        return res.status(500).send(error.message)  
    }
},

async updateData(req, res){

    try {
        await classRoom.update({...req.body}, {where: {roll: req.body.roll}})
        console.log("Data updated successfully")
        return res.status(202).send("Data Updated Successfully")
    } catch (error) {
        return res.status(500).send(error.message)  
    }
},
async deleteData(req, res){
    try {        
       const classEntryDestroyed = await classRoom.destroy({where: {
           roll: req.body.roll
       }}) 

       if(!classEntryDestroyed) throw new Error('Entered Roll Number not found in Database')
       return res.status(202).send("One field with given roll deleted.")
    } catch (error) {
        return res.status(500).send(error.message) 
    }
}


}