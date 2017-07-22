(function() {
	let Filter = (array, callback) => {
		let resultArray = [];
		for (let item of array) {
			if (callback.call(null, item)) resultArray.push(item);
		}
		return resultArray;
	};

	let result = Filter(
		[25, 45, 10, 36, 9, 8, 5, 1, 3, 5, 4, 8],
		item => item < 20
	);
	console.log(result);
})();
