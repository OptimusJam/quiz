var models = require('../models/models.js');

//AUTOLOAD: id de comentarios
exports.load = function(req, res, next, commentId) {
	console.log("AUTOLOAD del commentID");
	models.Comment.find({
		where: {
			id: Number(commentId)
		}
	}).then(function(comment) {
		if (comment) {
			req.comment = comment;
			next();
		} else {
			next(new Error('No existe CommentId = ' + commentId));
		}
	}
	).catch(function(error){next(error);});
};

//GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
	res.render('comments/new.ejs',{quizid: req.params.quizId, errors: []});
};

//POST /quizes/:quizID/comments
exports.create = function(req, res) {

	var locQuizId = req.params.quizId;
	var comment = models.Comment.build(
		{ 	texto: req.body.comment.texto,
			QuizId: locQuizId
	});
	
	comment.validate().then(
		function(err) {
			if (err) {
				res.render('comments/new.ejs',
					{comment: comment, quizid: locQuizId, errors: err.errors});
			} else { 
				//Guarda en BD campo texto del comentario
				comment.save().then( function() {
					res.redirect('/quizes/'+locQuizId);
				})
			}
		}
	).catch(function(error){next(error)});
};

//GET /quizes/:quizId/comments/:commentId/publish
exports.publish = function(req, res) {
	req.comment.publicado = true;
	req.comment.save( {fields: ["publicado"]})
		.then(function(){res.redirect('/quizes/'+req.params.quizId);})
		.catch(function(error){next(error)});		
};