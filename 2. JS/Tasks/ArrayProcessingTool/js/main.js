(function() {
	var inputString = document.getElementById("arrayInput").value;
	var result = document.querySelector("#result");
	var arrTools = new ArrayTools();

	var checkInputString = function(str) {
		var exp = /^(\d|\s|,|-)+$/gi;
		return exp.test(str);
	};

	var splitInputStringToArray = function(str) {
		var exp = /\d|\s|,|-/;
		return str.split(exp);
	};

	var buttonGetMaxValue = function() {
		if (!checkInputString(inputString)) {
			alert("Please, check input string...");
		} else {
			var inputArray = splitInputStringToArray(inputString);
			result.innerHTML = "Max array value: " + arrTools.getMax(inputArray);
		}
	};

	var buttonGetMinValue = function() {
		if (!checkInputString(inputString)) {
			alert("Please, check input string...");
		} else {
			var inputArray = splitInputStringToArray(inputString);
			result.innerHTML = "Min array value: " + arrTools.getMin(inputArray);
		}
	};

	var buttonGetMedianValue = function() {
		if (!checkInputString(inputString)) {
			alert("Please, check input string...");
		} else {
			var inputArray = splitInputStringToArray(inputString);
			result.innerHTML =
				"Median array value: " + arrTools.getMedian(inputArray);
		}
	};

	var buttonGetSubSumFast = function() {
		if (!checkInputString(inputString)) {
			alert("Please, check input string...");
		} else {
			var inputArray = splitInputStringToArray(inputString);
			result.innerHTML =
				"Max sub sum value(fast): " + arrTools.getMaxSubSumFast(inputArray);
		}
	};

	var buttonGetSubSumSlow = function() {
		if (!checkInputString(inputString)) {
			alert("Please, check input string...");
		} else {
			var inputArray = splitInputStringToArray(inputString);
			result.innerHTML =
				"Max sub sum value(slow): " + arrTools.getMaxSubSumSlow(inputArray);
		}
	};

	var buttonGetMaxIncreasingSequence = function() {
		if (!checkInputString(inputString)) {
			alert("Please, check input string...");
		} else {
			var inputArray = splitInputStringToArray(inputString);
			result.innerHTML =
				"Max Increasing value: " +
				arrTools.getMaxIncreasingSequence(inputArray);
		}
	};

	document
		.querySelector("#arrayMax")
		.addEventListener("click", buttonGetMaxValue);
	document
		.querySelector("#arrayMin")
		.addEventListener("click", buttonGetMinValue);
	document
		.querySelector("#arrayMedian")
		.addEventListener("click", buttonGetMedianValue);
	document
		.querySelector("#arraySubSumSlow")
		.addEventListener("click", buttonGetSubSumSlow);
	document
		.querySelector("#arraySubSumFast")
		.addEventListener("click", buttonGetSubSumFast);
	document
		.querySelector("#arrayMaxSequence")
		.addEventListener("click", buttonGetMaxIncreasingSequence);
})();
