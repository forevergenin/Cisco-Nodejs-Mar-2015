var tasks = [];

function runner(req, res, tasks){
   if (tasks.length === 0) return;
   var first = tasks[0];
   var remaining = tasks.slice(1);
   var  next = (function(tasks){
       return function(){
         runner(req, res, tasks)
       };
    })(remaining);
   first(req, res, next);
}

module.exports = {
	use : function(task){
		tasks.push(task);
	},
	run : function(){
		return function(req,res){
			runner(req, res, tasks);
		}
	}
}