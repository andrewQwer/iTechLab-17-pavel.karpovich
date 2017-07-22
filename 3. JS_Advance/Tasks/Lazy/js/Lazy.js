(function(){
	let Lazy = function(func){
		return func.bind.apply(func, arguments);
	}

	let Sum = (a, b) => {
		console.log (a + b);
		return a +b;
	}

	let LazySum = Lazy(Sum, 2, 9);

	LazySum();
})();