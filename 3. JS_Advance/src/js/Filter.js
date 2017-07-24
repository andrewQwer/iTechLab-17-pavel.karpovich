let Filter = (array, predicate) => {
	let resultArray = [];
	for (let item of array) {
		if (predicate.call(null, item)) resultArray.push(item);
	}
	return resultArray;
};

export default Filter;