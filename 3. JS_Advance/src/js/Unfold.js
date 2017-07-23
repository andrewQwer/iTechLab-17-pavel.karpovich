function Unfold(callback, initialValue) {
	let sequence = [],
		nextElement,
		currentState = (nextElement = initialValue);
	do {
		sequence.push(nextElement);
		[nextElement, currentState] = callback.call(null, currentState);
	} while (currentState);
	return sequence;
}

export default Unfold;
