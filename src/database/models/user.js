
const con = require('../connection')

const User = con.sequelize.define('users', {
	id:{
		allowNull:false,
        autoIncrement:true,
        primaryKey:true,
		type: con.Sequelize.INTEGER
	},
	name:{
		allowNull:false,
		type: con.Sequelize.STRING,

			validate:{
				notEmpty:{
					msg: "This field is required"
				}
			}

	},
		password:{
		allowNull:false,
		type: con.Sequelize.STRING,

			validate:{
				notEmpty:{
					msg: "This field is required"
				}
			}

	},
		email:{
		allowNull:false,
		type: con.Sequelize.STRING,

			validate:{
				notEmpty:{
					msg: "This field is required"
				}
			}

	}




})

//Categoria.sync({force: false})

module.exports = User

