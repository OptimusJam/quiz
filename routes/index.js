var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz-controller');
var commentController = require('../controllers/comment-controller');
var sessionController = require('../controllers/session-controller');
var estadisticasController = require('../controllers/estadisticas-controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comando con :quizId
router.param('quizId',quizController.load);
//Autoloas de comando para :commentId
router.param('commentId',commentController.load);

//router.get('/quizes/question',quizController.question);
//router.get('/quizes/answer',quizController.answer);

router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);

router.get('/quizes/new',					sessionController.loginRequired, quizController.new);
router.post('/quizes/create',				sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',	sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',			sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',		sessionController.loginRequired, quizController.destroy);

router.get('/author', quizController.author);

//Definicion de rutas de sesion
router.get('/login',						sessionController.new);		//Formulario de login
router.post('/login',						sessionController.create);	//Crear sesion
router.get('/logout',						sessionController.destroy);	//Destruir sesion

//Rutas de los comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',		commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
													sessionController.loginRequired, commentController.publish);

//Rutas de las estadisticas
router.get('/quizes/estadisticas',			estadisticasController.show);

module.exports = router;