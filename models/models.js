var path = require('path');

// Postgres DATABASE_URL = postgres:/user:password@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

//Cargar el nmodelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite
/*
var sequelize = new Sequelize(null,null,null,
				{dialect: "sqlite", 
				storage: "quiz.sqlite"}
				);
*/
				
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);
				
//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
//Importar la definicion de la tabla Comment en comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

//Relacion 1 a N entre las tablas Quiz y Comment
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//Exporta la definicion de las tablas
exports.Quiz = Quiz;
exports.Comment = Comment;

//sequelize.sync() crea e inicializa la tabla de preguntas en DB
//success(...) ejectua el manejador una vez creada la tabla
//Se cambia success por then -> leido en el foro
sequelize.sync().then(function() {
	Quiz.count().then(function(count) {
		if (count === 0) { //La tabla se inicializa solo si esta vacia
			Quiz.create({pregunta: 'Capital de Italia',
						respuesta: 'Roma',
						tema: "humanidades"
						});
			Quiz.create({pregunta: 'Capital de Portugal',
						respuesta: 'Lisboa', 
						tema: "humanidades"						
						})
			.then(function(){
				console.log('Base de datos inicializada')
			});
		};
	}); //Quiz.count
}); //Sync