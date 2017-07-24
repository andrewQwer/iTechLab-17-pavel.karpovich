let Map = (array, predicate) => {
	let resultArray = [];
	for (let item of array) {
		resultArray.push(predicate.call(null, item));
	}
	return resultArray;
};

export default Map;