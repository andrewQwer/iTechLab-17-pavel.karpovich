(function(){
	var checkInputString = function (str) {
        var exp = /^(\d|\s|,|-)+$/gi;
        return exp.test(str);
    };

    var splitInputStringToArray = function (str) {
        var exp = /\s|,/;
        return str.split(exp);
    };

    var buttonGetMaxValue = function() {
        var inputString = document.getElementById("arrayInput").value;
        if(!checkInputString(inputString)) {
            alert("Please, check input string...")
        } else {
            var inputArray = splitInputStringToArray(inputString);
            document.querySelector("#result").innerHTML = "Max array value: " +
                    new ArrayTools().getMax(inputArray);
        }
    };

    var buttonGetMinValue = function() {
        var inputString = document.getElementById("arrayInput").value;
        if(!checkInputString(inputString)) {
            alert("Please, check input string...")
        } else {
            var inputArray = splitInputStringToArray(inputString);
            document.querySelector("#result").innerHTML = "Min array value: " +
                new ArrayTools().getMin(inputArray);
        }
    };

    var buttonGetMedianValue = function() {
        var inputString = document.getElementById("arrayInput").value;
        if(!checkInputString(inputString)) {
            alert("Please, check input string...")
        } else {
            var inputArray = splitInputStringToArray(inputString);
            document.querySelector("#result").innerHTML = "Median array value: " +
                new ArrayTools().getMedian(inputArray);
        }
    };

    var buttonGetSubSumFast = function() {
        var inputString = document.getElementById("arrayInput").value;
        if(!checkInputString(inputString)) {
            alert("Please, check input string...")
        } else {
            var inputArray = splitInputStringToArray(inputString);
            document.querySelector("#result").innerHTML = "Max sub sum value(fast): " +
                new ArrayTools().getMaxSubSumFast(inputArray);
        }
    };

    var buttonGetSubSumSlow = function() {
        var inputString = document.getElementById("arrayInput").value;
        if(!checkInputString(inputString)) {
            alert("Please, check input string...")
        } else {
            var inputArray = splitInputStringToArray(inputString);
            document.querySelector("#result").innerHTML = "Max sub sum value(slow): " +
                new ArrayTools().getMaxSubSumSlow(inputArray);
        }
    };

    var buttonGetMaxIncreasingSequence = function() {
        var inputString = document.getElementById("arrayInput").value;
        if(!checkInputString(inputString)) {
            alert("Please, check input string...")
        } else {
            var inputArray = splitInputStringToArray(inputString);
            document.querySelector("#result").innerHTML = "Max Increasing value: " +
                new ArrayTools().getMaxIncreasingSequence(inputArray);
        }
    };

    document.querySelector("#arrayMax").addEventListener("click", buttonGetMaxValue);
    document.querySelector("#arrayMin").addEventListener("click", buttonGetMinValue);
    document.querySelector("#arrayMedian").addEventListener("click", buttonGetMedianValue);
    document.querySelector("#arraySubSumSlow").addEventListener("click", buttonGetSubSumSlow);
    document.querySelector("#arraySubSumFast").addEventListener("click", buttonGetSubSumFast);
    document.querySelector("#arrayMaxSequence").addEventListener("click", buttonGetMaxIncreasingSequence);
}());