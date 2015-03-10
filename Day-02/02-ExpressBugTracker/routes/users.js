var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function(req,res,next){
	res.send("A new user has to be added here");
});

router.get('/list', function(req,res,next){
	res.send("all the users will be listed here");
});

router.get('/remove', function(req,res,next){
	res.send("An existing user will be removed here");
});

module.exports = router;
