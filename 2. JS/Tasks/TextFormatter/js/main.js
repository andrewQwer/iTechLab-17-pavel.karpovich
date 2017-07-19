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
		var sentense = document.querySelector("#inputText").value;
		var sentenseSize = parseInt(document.querySelector("#sentenseSize").value);
		var symbolSize = parseInt(document.querySelector("#symbolSize").value);
		var type = selectType();
		var textFormater = new TextFormatter(sentense).Format(symbolSize, sentenseSize, type);
		outResult(textFormater);
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

	document.querySelector("#sentenseSize").addEventListener("mousemove", function (event) {
		document.querySelector("#sentenseValue").innerHTML = event.target.value;
		format();
	});

	document.querySelector("#symbolSize").addEventListener("mousemove", function (event) {
		document.querySelector("#symbolValue").innerHTML = event.target.value;
		format();
	});
}());