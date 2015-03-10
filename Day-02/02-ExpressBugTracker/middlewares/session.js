var sessionStore = {

};

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

function createNewSession(req, res){
	var newSessionId = generateUUID();
	sessionStore[newSessionId] = {store : {}, timeStamp : new Date()};
	res.cookie("sessionId", newSessionId);
	return newSessionId;
}

function isNewSession(req){
	return !(req.cookies.sessionId && sessionStore[req.cookies.sessionId]);
}

function getCurrentSessionId(req,res){
	if (isNewSession(req)){
		return createNewSession(req,res)
	} else {
		return req.cookies.sessionId
	}
}

module.exports = function(req,res,next){
	var currentSession = sessionStore[getCurrentSessionId(req,res)];
	currentSession.timeStamp = new Date();
	req.session = currentSession.store;
	next();
}