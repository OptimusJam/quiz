var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz-controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comando con :quizId
router.param('quizId',quizController.load);

//router.get('/quizes/question',quizController.question);
//router.get('/quizes/answer',quizController.answer);

router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);

router.get('/author', quizController.author);

module.exports = router;