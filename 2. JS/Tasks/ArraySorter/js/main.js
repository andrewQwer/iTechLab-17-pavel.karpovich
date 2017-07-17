(function () {
	var getRandomInt = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var checkInput = function (str) {
		var exp = /^\d+$/;
		return exp.test(str);
	}

	var createArrayWithRandomValue = function (count) {
		var array = [];
		for (var i = 0; i < count; i++) {
			array.push(getRandomInt(0, 100));
		}
		return array;
	}

	var selectType = function () {
		var type = document.getElementsByName("sortType");
		var sortType;
		for (var i = 0; i < type.length; i++) {
			if (type[i].type == "radio" && type[i].checked) {
				sortType = type[i].value;
			}
		}
		return sortType;
	}

	var outputResult = function (original, result) {
		document.querySelector("#result").innerHTML = "Unsorted array: " + original + "<br>Sorted array: " + result;
	}

	var startSort = function () {
		try {
			var count = document.querySelector("#arrayCount").value;
			if (!checkInput(count))
				throw "Please, check input string!";
			var array = createArrayWithRandomValue(count);
			var originalArray = JSON.parse(JSON.stringify(array));
			var sortedArray = [];
			switch (selectType()) {
				case "bubble":
					sortedArray = new ArraySorter().BubbleSort(array);
					break;
				case "insert":
					sortedArray = new ArraySorter().InsertSort(array);
					break;
				case "quick":
					sortedArray = new ArraySorter().QuickSort(array);
					break;
				case "select":
					sortedArray = new ArraySorter().SelectSort(array);
					break;
			}
			outputResult(originalArray, sortedArray);
		} catch (error) {
			alert("Error! " + error);
			return;
		}
	}

	document.querySelector("#generateButton").addEventListener("click", startSort);
}());