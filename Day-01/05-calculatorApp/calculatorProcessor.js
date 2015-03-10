var calculator = require("./calculator");

String.prototype.toNumber= function(){
	return parseInt(this,10);
}

module.exports = function(req, res, next){
	console.log(req.headers);
	if (req.url.pathname === "/calculator"){
		var data = req.method === "POST" ? req.body : req.query;
		var result = calculator[data.op](data.n1.toNumber(), data.n2.toNumber());
		res.write(result.toString());
		res.end();
	} else {
		next();
	}
}