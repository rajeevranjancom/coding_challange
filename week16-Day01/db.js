const Sequelise = require("sequelize");
const sequelize = new Sequelise(process.env.POSTGRES_URI);

sequelize.sync();

// sequelize 
// .then(() => console.log("POSTGRESQL Connected Successfully!!!"))
// .catch(error => console.log(`Error : ${error.message}`));

sequelize


module.exports = sequelize;