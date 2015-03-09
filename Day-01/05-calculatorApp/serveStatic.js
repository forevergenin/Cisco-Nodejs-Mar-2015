var	fs = require("fs"),
	url = require("url"),
	path = require("path");

var staticResourceExtns = [".html",".css",".js",".img",".png",".ico"];

function isStaticResource(resourceName){
	return staticResourceExtns.indexOf(path.extname(resourceName)) !== -1;
}

module.exports = function(req,res,next){
	if (isStaticResource(req.url.pathname)){
		var resourcePath = path.join(__dirname, req.url.pathname);
		fs.exists(resourcePath, function(exists){
			if (exists){
				var stream = fs.createReadStream(resourcePath, {encoding : "utf8"});
				stream.pipe(res);
			} else {
				next();
			}
		})	
	} else {
		next();
	}
};
