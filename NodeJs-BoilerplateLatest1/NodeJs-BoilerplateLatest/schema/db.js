const Sequelize = require("sequelize");
const dotenv = require('dotenv')
dotenv.config()
/**
 * CONNECT DATABASE
 */
const sequelize = new Sequelize(process.env.db, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: process.env.dialect,
    operatorsAliases: 0,
    logging: false
});
sequelize.sync({ force: false }).then(() => {
    console.log("database connected!");
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * CREATE AND ACCESS PERTICULLER DATA TABLE
 */
db.users = require('./userSchema')(sequelize, Sequelize)

module.exports = db

// ALTER TABLE `users`  ADD `randomString` VARCHAR(100) NULL DEFAULT NULL  AFTER `appleId`;