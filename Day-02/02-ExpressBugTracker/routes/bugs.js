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

router.get('/new', function(req,res,next){
	res.render('bugs/new');
})

router.post('/new', function(req, res, next){
	var newBugTitle = req.body.bugTitle;
	var newBugId = bugsRepository.reduce(function(currId, bug){
		return currId > bug.id ? currId : bug.id;
	}, 0) + 1;
	var newBug = {
		id : newBugId,
		title : newBugTitle,
		isClosed : false
	};
	bugsRepository.push(newBug);
	res.redirect('/bugs/');
});


router.get('/remove', function(req,res,next){
	res.send("An existing user will be removed here");
});

module.exports = router;
