const Sequelize = require("sequelize")

const sequelize = new Sequelize('teste', 'root', 'admin',{
    host: 'localhost',
    dialect: 'mariadb'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}