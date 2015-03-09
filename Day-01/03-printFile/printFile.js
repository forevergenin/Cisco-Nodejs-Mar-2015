var fs = require("fs");
/*fs.readFile("sample.txt", {encoding : "utf8"}, function(err, data){
	console.log(data);
});*/
var stream = fs.createReadStream("sample.txt", {encoding : "utf8"});
//open, close, data, error
var dataEventCount = 0;
stream.on("data", function(dataChunk){
	console.log(dataChunk);
	++dataEventCount;
});
stream.on("end", function(){
	console.log("===========================");
	console.log("thats all folks!");
	console.log("dataEventCount = ", dataEventCount);
	console.log("===========================");
});