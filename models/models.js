var path = require('path');

//Cargar el nmodelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite
var sequelize = new Sequelize(null,null,null,
				{dialect: "sqlite", storage: "quiz.sqlite"}
				);
				
//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
//Exporta la definicion de la tabla
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa la tabla de preguntas en DB
//success(...) ejectua el manejador una vez creada la tabla
//Se cambia success por then -> leido en el foro
sequelize.sync().then(function() {
	Quiz.count().then(function(count) {
		if (count === 0) { //La tabla se inicializa solo si esta vacia
			Quiz.create({pregunta: 'Capital de Italia',
						respuesta: 'Roma'
						})
			.then(function(){
				console.log('Base de datos inicializada')
			});
		};
	}); //Quiz.count
}); //Sync