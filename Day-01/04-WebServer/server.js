var http = require("http"),
	fs = require("fs"),
	path = require("path");

//calculator?op=add&n1=10&n2=20

var server = http.createServer(function(req,res){
	var resourceName = req.url  === "/" ? "/index.html" : req.url,
		resourcePath = path.join(__dirname, resourceName);

	var stream = fs.createReadStream(resourcePath, {encoding : "utf8"});
	stream.on("error", function(){
		console.log(req.url + " - NOT FOUND!");
		res.statusCode = 404;
		res.end();
	})
	/*stream.on("data", function(chunk){
		res.write(chunk);
	});
	stream.on("end", function(){
		res.end();
	});*/
	stream.pipe(res);
});
server.listen(9090);