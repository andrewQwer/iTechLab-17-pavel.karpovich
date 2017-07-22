(function() {
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

	let array = Unfold(function(currentState) {
		let nextElement = --currentState;
		return [nextElement, nextElement > 0 ? nextElement : false];
	}, 10);

	console.log(array);
})();
