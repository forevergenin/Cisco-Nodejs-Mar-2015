var	fs = require("fs"),
	url = require("url"),
	path = require("path");

var staticResourceExtns = [".html",".css",".js",".img",".png",".ico"];

function isStaticResource(resourceName){
	return staticResourceExtns.indexOf(path.extname(resourceName)) !== -1;
}

var _options = {
	baseDir : __dirname,
	cache :false
};

module.exports = function(options){
	options = options || {};
	_options.baseDir = options.baseDir || _options.baseDir;
	_options.cache = options.cache || _options.cache;
	return process;
}

function process(req,res,next){
	if (isStaticResource(req.url.pathname)){
		var resourcePath = path.join(_options.baseDir, req.url.pathname);
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
