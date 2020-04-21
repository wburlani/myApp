const db = require('./db')

const Categoria = db.sequelize.define('tb_categoria', {
	idCategoria:{
		allowNull:false,
        autoIncrement:true,
        primaryKey:true,
		type: db.Sequelize.INTEGER
	},
	descricaoCategoria:{
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

module.exports = Categoria