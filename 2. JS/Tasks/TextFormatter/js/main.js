(function () {
	var outResult = function (result) {
		var resultString = "";
		for (var i = 0; i < result.length; i++) {
			var number = i + 1;
			resultString += "<br>" + number + ". " + result[i];
		}
		document.querySelector("#result").innerHTML = resultString;
	}

	var format = function () {
		var sentence = document.querySelector("#inputText").value;
		var sentenceSize = parseInt(document.querySelector("#sentenceSize").value);
		var symbolSize = parseInt(document.querySelector("#symbolSize").value);
		var type = selectType();
		var textFormatter = new TextFormatter(sentence).Format(symbolSize, sentenceSize, type);
		outResult(textFormatter);
	}

	var selectType = function () {
		var buttons = document.getElementsByName("formatType");
		var result;
		for (var i = 0; i < buttons.length; i++) {
			result = (buttons[i].checked) ? buttons[i].value : result;
		}
		return result;
	}

	document.querySelector("#inputText").addEventListener("keyup", format);

	document.querySelector("#sentenceSize").addEventListener("mousemove", function (event) {
		document.querySelector("#sentenceValue").innerHTML = event.target.value;
		format();
	});

	document.querySelector("#symbolSize").addEventListener("mousemove", function (event) {
		document.querySelector("#symbolValue").innerHTML = event.target.value;
		format();
	});
}());