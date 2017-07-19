function TextFormatter(sentence) {
	var sentence = sentence;

	var wordType = function (endPosition) {
		while (sentence[endPosition] != '\t' && sentence[endPosition] != '\n' &&
			sentence[endPosition] != ' ' && sentence[endPosition] != undefined) {
			endPosition++;
		}
		return endPosition;
	}

	var sentenceType = function (endPosition) {
		while (sentence[endPosition] != '.' && sentence[endPosition] != undefined) {
			endPosition++;
		}
		return endPosition + 1;
	}

	this.Format = function (symbolSize, sentenceSize, type) {
		var sentences = []
		var startPosition = 0;
		var endPosition = symbolSize - 1; // because, string length start with zero
		while (endPosition <= sentence.length && sentences.length < sentenceSize) {
			endPosition = (type === "word") ? wordType(endPosition) :
				(type === "sentence") ? sentenceType(endPosition) : endPosition;
			sentences.push(sentence.slice(startPosition, endPosition).trim());
			startPosition = endPosition;
			endPosition += symbolSize;
		}
		return sentences;
	}
}