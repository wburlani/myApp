const db = require('./db')


//Cria a tabela no banco de dados
const Subgrupo = db.sequelize.define('tb_Subgrupos', {
	idSubgrupo:{
		allowNull: false,
        autoIncrement: true,
        primaryKey: true,
		type: db.Sequelize.INTEGER
	},
	descricaoSubgrupo:{
		allowNull: false,
		type: db.Sequelize.STRING
	},

	fkCategoria:{
		allowNull: false,
     	type: db.Sequelize.INTEGER,
     	references:{ //referencia tabela Categoria
     		model: 'tb_Categoria',
     		key: 'idCategoria'
     	}
	}
})
	/*Não executar o bloco .sync depois de criada a tabela, e inserido os dados!!!*/
		
	
//Subgrupo.sync({force: true})
module.exports = Subgrupo