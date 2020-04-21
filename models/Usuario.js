const db = require('./db')

const Usuario = db.sequelize.define('usuarios', {
	id:{
		allowNull:false,
        autoIncrement:true,
        primaryKey:true,
		type: db.Sequelize.INTEGER
	},
	nome:{
		allowNull:false,
		type: db.Sequelize.STRING,

			validate:{
				notEmpty:{
					msg: "Esse campo é obrigatório"
				}
			}

	},
		senha:{
		allowNull:false,
		type: db.Sequelize.STRING,

			validate:{
				notEmpty:{
					msg: "Esse campo é obrigatório"
				}
			}

	}

})


//Categoria.sync({force: false})

module.exports = Usuario