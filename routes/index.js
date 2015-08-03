var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz-controller');
var commentController = require('../controllers/comment-controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comando con :quizId
router.param('quizId',quizController.load);

//router.get('/quizes/question',quizController.question);
//router.get('/quizes/answer',quizController.answer);

router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);

router.get('/quizes/new',					quizController.new);
router.post('/quizes/create',				quizController.create);

router.get('/quizes/:quizId(\\d+)/edit',	quizController.edit);
router.put('/quizes/:quizId(\\d+)',			quizController.update);

router.delete('/quizes/:quizId(\\d+)',		quizController.destroy);

router.get('/author', quizController.author);

//Rutas de los comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',		commentController.create);

module.exports = router;