var http = require("http"),
	path = require("path"),
	appEngine = require("./appEngine"),
	dataParser = require("./dataParser"),
	serveStatic = require("./serveStatic"),
	calculatorProcessor = require("./calculatorProcessor");

appEngine.use(dataParser);
appEngine.use(serveStatic({baseDir : path.join(__dirname, "public")}));
appEngine.use(calculatorProcessor);
appEngine.use(function(req, res){
	res.statusCode = 404;
	res.end();
});

http.createServer(appEngine.run()).listen(9090);
console.log("server running on port 9090");