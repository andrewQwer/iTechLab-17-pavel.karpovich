(function() {
	let Memoize = func => {
		let cache = {};

		return (...args) => {
			let key = JSON.stringify(args);
			return key in cache ? cache[key] : (cache[key] = func.apply(this, args));
		};
	};

	var sum = Memoize(function(a, b) {
		console.log(`Out of cache!`);
		return a + b;
	});

	console.log(sum(5, 5));
	console.log(sum(5, 10));
	console.log(sum(5, 5));
})();
