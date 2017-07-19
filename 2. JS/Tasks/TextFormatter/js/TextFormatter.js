function TextFormatter(sentense) {
	var _sentense = sentense;

	var wordType = function (endPosition) {
		while (_sentense[endPosition] != '\t' && _sentense[endPosition] != '\n' &&
			_sentense[endPosition] != ' ' && _sentense[endPosition] != undefined) {
			endPosition++;
		}
		return endPosition;
	}

	var sentenseType = function (endPosition) {
		while (_sentense[endPosition] != '.' && _sentense[endPosition] != undefined) {
			endPosition++;
		}
		return endPosition + 1;
	}

	this.Format = function (symbolSize, sentenseSize, type) {
		var sentenses = []
		var startPosition = 0;
		var endPosition = symbolSize - 1; // because, string length start with zero
		while (endPosition <= _sentense.length && sentenses.length < sentenseSize) {
			endPosition = (type === "word") ? wordType(endPosition) :
				(type === "sentense") ? sentenseType(endPosition) : endPosition;
			sentenses.push(_sentense.slice(startPosition, endPosition).trim());
			startPosition = endPosition;
			endPosition += symbolSize;
		}
		return sentenses;
	}
}