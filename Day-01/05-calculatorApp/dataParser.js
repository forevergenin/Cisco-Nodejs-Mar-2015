var	url = require("url"),
	qs = require('querystring');

function f(){

}
var cache = {}

module.exports = function(req, res, next){
	req.url = url.parse(req.url, false);
	req.query = qs.parse(req.url.query);

	if (req.method === "POST"){
		var bodyData = '';
		req.on("data", function(data){
			bodyData += data;
		});
		req.on("end", function(){
			req.body = qs.parse(bodyData);
			next();
		})
	} else {
		next();
	}
};
