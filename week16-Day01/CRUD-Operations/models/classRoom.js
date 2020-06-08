const Sequelise = require("sequelize");
const sequelize = require("../../db");

const classRoomModel = {
    name: {
        type: Sequelise.STRING,
        allowNull: false,
        unique: true
    },
    roll: {
        type: Sequelise.INTEGER,
        allowNull: false,
        unique: true
    }
}

const classRoom = sequelize.define("classRoomDetail", classRoomModel, {sequelize})

module.exports = classRoom