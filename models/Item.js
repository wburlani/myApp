const db = require('./db')

//Cria a tabela no banco de dados
const Item = db.sequelize.define('tb_Item', {
	idItem:{
		allowNull: false,
        autoIncrement: true,
        primaryKey: true,
		type: db.Sequelize.INTEGER
	},
	descricaoItem:{
		allowNull: false,
		type: db.Sequelize.STRING
	},

	codEanItem:{
		type: db.Sequelize.INTEGER
	},

	fkSubgrupo:{
		allowNull: false,
     	type: db.Sequelize.INTEGER,
     	references:{ //referencia tabela Categoria
     		model: 'tb_Subgrupos',
     		key: 'idSubgrupo'
     	}


	}


})
	
	/*Não executar o bloco .sync depois de criada a tabela, e inserido os dados!!!*/
		
	
//Item.sync({force: true})

module.exports = Item