(function() {
	function Map(array, callback) {
		let resultArray = [];
		for (let item of array) {
			resultArray.push(callback.call(null, item));
		}
		return resultArray;
	}

	var lengthArray = Map(["liza", "taller", "maax"], item => item.length);
	console.log(lengthArray);
})();
