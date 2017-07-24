let First = (array, predicate) => {
	for (let item of array) {
		if (predicate.call(null, item)) return item;
	}
};

export default First;