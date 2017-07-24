let Fold = (array, callback, initialValue) => {
	let previousValue = initialValue,
		currentValue,
		index;
	for (let i = 0; i < array.length; i++) {
		currentValue = array[i];
		index = i;
		previousValue = callback.call(
			null,
			previousValue,
			currentValue,
			index,
			array
		);
	}
	return previousValue;
};

export default Fold;