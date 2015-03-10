var express = require('express');
var router = express.Router();

var bugsRepository = [
	{id : 1, title : "Login button is disabled", isClosed : false},
	{id : 2, title : "Application crashes often", isClosed : false},
	{id : 3, title : "Users are logged off interminently", isClosed : false},
]


/* GET bugs listing. */
router.get('/', function(req, res, next) {
    res.render('bugs/index', {
    	list : bugsRepository
    }); 
});

router.get('/new', function(){

})

router.post('/new', function(){
	//req.body will have the data
})

router.get('/add', function(req,res,next){
	res.send("A new user has to be added here");
});

router.get('/remove', function(req,res,next){
	res.send("An existing user will be removed here");
});

module.exports = router;
