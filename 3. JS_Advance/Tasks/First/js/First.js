(function() {
	let First = (array, predicate) => {
		for (let item of array) {
			if (predicate.call(null, item)) return item;
		}
	};

	var result = First([1, 2, 3, 4, 5], item => item > 3);
	console.log(result);
})();
