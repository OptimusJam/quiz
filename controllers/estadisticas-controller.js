var models = require('../models/models.js');

//GET /quizes/estadisticas
exports.show = function (req, res) {

	//Modelo con las Quizes: Quiz
	//Modelo con los Comentarios: Comment
	
	//Objeto de intercambio para las estadisticas:
	var objEstadisticas = {
		totalPreguntas: 			0,
		totalComentarios: 			0,
		comentariosPorPregunta:		0,
		preguntaConComentarios:		0,	
		preguntaSinComentarios:		0
	};	
	
	//Numero total de preguntas
	/*models.Quiz.count().then(function(quizes) {
			console.log('Preguntas totales: ' + quizes);
			objEstadisticas.totalPreguntas = quizes;
		}
		).catch(function(error) { next(error);});
		
	//Numero total de comentarios
	models.Comment.count().then(function(comments) {
			console.log('Comentarios totales: ' + comments);
			objEstadisticas.totalComentarios = comments;
		}
		).catch(function(error) { next(error);});
		*/
	
	//Numero de preguntas con comentarios
	/*models.Quiz.count({
        distinct: true,
        include: [{ model: models.Comment, required: true }]}
		).then(function(quizsConComments){
			console.log('Preguntas con comentarios: ' + quizsConComments);
			objEstadisticas.preguntaConComentarios = quizsConComments;
		}).catch(function(error) {next(error);});
	*/

	//Numero total de preguntas
	models.Quiz.count(
		).then(function(quizes) {
			console.log('Preguntas totales: ' + quizes);
			objEstadisticas.totalPreguntas = quizes;
			return models.Comment.count();
		}
		).then(function(comments) {
			console.log('Comentarios totales: ' + comments);
			objEstadisticas.totalComentarios = comments;
			return models.Quiz.count({
					distinct: true,
					include: [{ model: models.Comment, required: true }]}
					)			
			}
		).then(function(quizsConComments){
			console.log('Preguntas Con comentarios: ' + quizsConComments);
			objEstadisticas.preguntaConComentarios = quizsConComments;
			objEstadisticas.preguntaSinComentarios = objEstadisticas.totalPreguntas - objEstadisticas.preguntaConComentarios;
			console.log('Preguntas Sin comentarios: ' + objEstadisticas.preguntaSinComentarios);
			var commentsPorQuiz = (objEstadisticas.totalComentarios / objEstadisticas.totalPreguntas).toFixed(2);
			console.log('Comentarios por pregunta: ' + commentsPorQuiz)
			objEstadisticas.comentariosPorPregunta = commentsPorQuiz;
			
			res.render('estadisticas/index',{estadisticas: objEstadisticas, errors:[]});
		}).catch(function(error) { 
			console.log("Error: " + error);
			next(error);
		});
};