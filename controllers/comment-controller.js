var models = require('../models/models.js');

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