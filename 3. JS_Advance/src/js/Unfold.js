function Unfold(callback, initialValue) {
	let sequence = [],
		nextElement,
		currentState = (nextElement = initialValue);
	while (currentState) {
		[nextElement, currentState] = callback.call(null, currentState);
		if (!currentState) break;
		sequence.push(nextElement);
	}
	return sequence;
}

export default Unfold;
