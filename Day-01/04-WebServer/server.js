var http = require("http"),
	fs = require("fs"),
	url = require("url"),
	qs = require('querystring'),
	calculator = require("./calculator"),
	path = require("path");

//calculator?op=add&n1=10&n2=20

var staticResourceExtns = [".html",".css",".js",".img",".png",".ico"];

function isStaticResource(resourceName){
	return staticResourceExtns.indexOf(path.extname(resourceName)) !== -1;
}

String.prototype.toNumber= function(){
	return parseInt(this,10);
}

var server = http.createServer(function(req,res){
	var resourceName = req.url  === "/" ? "/index.html" : req.url;
	req.url = url.parse(req.url, true);
	
	/*if (staticResource){
		if (file exists)
			serve the file
		else
			serve 404
	} else if ('calculator'){
		extract data from url
		use calculator to get the result
		serve the result
	}*/
	if (isStaticResource(req.url.pathname)){
		var resourcePath = path.join(__dirname, req.url.pathname);
		fs.exists(resourcePath, function(exists){
			if (exists){
				var stream = fs.createReadStream(resourcePath, {encoding : "utf8"});
				stream.pipe(res);
			} else {
				console.log(req.url + " - NOT FOUND!");
				res.statusCode = 404;
				res.end();
			}
		})	
	} else if (req.url.pathname === "/calculator"){
		//req.url.query = qs.parse(req.url.query);
		
		var reqData = null;
		if (req.method === "GET"){
			reqData = req.url.query;
			var result = calculator[reqData.op](reqData.n1.toNumber(), reqData.n2.toNumber());
			res.write(result.toString());
			res.end();
		}
		if (req.method === "POST"){
			var bodyData = '';
			req.on("data", function(data){
				bodyData += data;
			});
			req.on("end", function(){
				reqData = qs.parse(bodyData);
				var result = calculator[reqData.op](reqData.n1.toNumber(), reqData.n2.toNumber());
				res.write(result.toString());
				res.end();		
			})
		}
		
	} else {
		res.statusCode = 404;
		res.end();
	}
	
});
server.listen(9090);