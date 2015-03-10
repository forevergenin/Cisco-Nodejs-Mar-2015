var products = [
	{id : 5, name : "Pen", cost : 70, units : 60, category : 1},
	{id : 8, name : "Hen", cost : 80, units : 30, category : 2},
	{id : 9, name : "Ten", cost : 90, units : 80, category : 1},
	{id : 7, name : "Len", cost : 60, units : 50, category : 2},
	{id : 3, name : "Den", cost : 30, units : 70, category : 1},
	{id : 2, name : "Zen", cost : 50, units : 40, category : 2}
]

function print(title, fn){
	console.group(title);
	fn();
	console.groupEnd();	
}

print("Default list of products", function(){
	console.table(products);
});

print("Sorting", function(){
	print("Default [by id]", function(){
		function sort(){
			for(var i=0; i<products.length-1;i++)
				for(var j= i+1; j<products.length; j++){
					var left = products[i],
						right = products[j];
					if (left.id > right.id){
						products[i] = products[j];
						products[j] = left;
					}
				}
		}
		sort();
		console.table(products);
	});

	print("Sort [any list by any attribute]", function(){
		function sort(list, attrName){
			for(var i=0; i<list.length-1;i++)
				for(var j= i+1; j<list.length; j++){
					var left = list[i],
						right = list[j];
					if (left[attrName] > right[attrName]){
						list[i] = list[j];
						list[j] = left;
					}
				}
		}
		print("Sort -products by cost", function(){
			sort(products, "cost");
			console.table(products);
		});
		print("Sort -products by units", function(){
			sort(products, "units");
			console.table(products);
		});
	});

	print("Sort [any list any logic using a comparerFn]", function(){
		function sort(list, comparerFn){
			for(var i=0; i<list.length-1;i++)
				for(var j= i+1; j<list.length; j++){
					var left = list[i],
						right = list[j];
					if (comparerFn(left, right) > 0){
						list[i] = list[j];
						list[j] = left;
					}
				}
		}
		print("Sort -products value [cost * units]", function(){
			var productComparerByValue = function(p1, p2){
				//supposed to return +1 or 0 or -1
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;

				if (p1Value < p2Value) return -1;
				if (p1Value === p2Value) return 0;
				return 1;
			}
			sort(products, productComparerByValue);
			console.table(products);
		});
	});
});

print("Filter", function(){
	function filter(list, predicate){
		var result = [];
		for(var i=0;i < list.length; i++)
			if (predicate(list[i]))
				result.push(list[i]);
		return result;
	}
	var costlyProductPredicate = function(p){
			return p.cost > 50;
		};
	var negateProductPredicate = function(productPredicate){
		return function(p){
			return !productPredicate(p);
		}
	}
	var negate = function(predicate){
		return function(){
			return !predicate.apply(this,arguments);
		}
	}
	/*var affordableProductPredicate = function(p){
		return !costlyProductPredicate(p);
	}*/
	var affordableProductPredicate = negateProductPredicate(costlyProductPredicate);

	print("All costly products [ cost > 50 ]", function(){
		var costlyProductPredicate = function(p){
			return p.cost > 50;
		};
		var allCostlyProducts = filter(products, costlyProductPredicate);
		console.table(allCostlyProducts);
	});
	var category1ProductPredicate = function(p){
			return p.category === 1;
		};
	var allExpectCategory1ProductPredicate = function(p){
		return !category1ProductPredicate(p);
	}
	print("All category 1 products", function(){
		
		var allCategory1Products = filter(products, category1ProductPredicate);
		console.table(allCategory1Products);
	});
});

print("GroupBy", function(){
	function groupBy(list, keySelector){
		var result = {};
		for(var i=0; i<list.length; i++){
			var key = keySelector(list[i]);
			if (typeof result[key] === "undefined") result[key] = [];
			result[key].push(list[i]);
		}
		return result;
	}
	var categoryKeySelector = function(p){ return p.category; };
	var productsByCategory = groupBy(products, categoryKeySelector);
	console.log(productsByCategory);

	var costKeySelector = function(p){ return p.cost > 50 ? "costly" : "affordable" };
	var productsByCost = groupBy(products, costKeySelector);
	console.log(productsByCost);

})