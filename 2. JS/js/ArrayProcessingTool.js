/**
 * Created by pavel.karpovich on 7/14/2017.
 */
(function () {
    function ArrayProcessingTool(inputArray) {
        var array = [];

        for (var i = 0; i < inputArray.length; i++) {
            array.push(parseInt(inputArray[i]));
        }

        this.getArray = function () {
            return array;
        };

        this.getSorted = function () {
            var sortedArray = JSON.parse(JSON.stringify(array));
            return sortedArray.sort(function (a, b) {
                return a - b
            });
        };

        this.getMaxSubSumFast = function () {
            var sum = 0;
            var maxSum = 0;
            array.forEach(function (element, index, array) {
                sum += element;
                maxSum = Math.max(maxSum, sum);
                sum = (sum < 0) ? 0 : sum;
            });
            return maxSum;
        };

        this.getMaxSubSumSlow = function () {
            var maxSum = 0;
            for (var i = 0; i < array.length; i++) {
                var sum = 0;
                for (var k = i; k < array.length; k++) {
                    sum += array[k];
                    maxSum = Math.max(maxSum, sum);
                }
            }
            return maxSum;
        };

        this.getMax = function () {
            return this.getSorted()[array.length - 1];
        };

        this.getMin = function () {
            return this.getSorted()[0];
        };

        this.getMedian = function () {
            var half = Math.floor(array.length / 2);
            return (array.length % 2 !== 0) ?
                this.getSorted()[half] : (this.getSorted()[half - 1] + this.getSorted()[half]) / 2;
        };

        this.getMaxIncreasingSequence = function () {
            var sequence = [[]];
            var maxSequenceIndex = 0;
            array.forEach(function (element, index, array) {
                if (element < array[index - 1]) {
                    maxSequenceIndex = (maxSequenceIndex < sequence[sequence.length - 1].length) ?
                        sequence.length - 1 : maxSequenceIndex;
                    sequence[sequence.length] = [];
                }
                sequence[sequence.length - 1].push(element);
            });
            return sequence[maxSequenceIndex];
        };
    }

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
                    new ArrayProcessingTool(inputArray).getMax();
        }
    };

    var buttonGetMinValue = function() {
        var inputString = document.getElementById("arrayInput").value;
        if(!checkInputString(inputString)) {
            alert("Please, check input string...")
        } else {
            var inputArray = splitInputStringToArray(inputString);
            document.querySelector("#result").innerHTML = "Min array value: " +
                new ArrayProcessingTool(inputArray).getMin();
        }
    };

    var buttonGetMedianValue = function() {
        var inputString = document.getElementById("arrayInput").value;
        if(!checkInputString(inputString)) {
            alert("Please, check input string...")
        } else {
            var inputArray = splitInputStringToArray(inputString);
            document.querySelector("#result").innerHTML = "Median array value: " +
                new ArrayProcessingTool(inputArray).getMedian();
        }
    };

    var buttonGetSubSumFast = function() {
        var inputString = document.getElementById("arrayInput").value;
        if(!checkInputString(inputString)) {
            alert("Please, check input string...")
        } else {
            var inputArray = splitInputStringToArray(inputString);
            document.querySelector("#result").innerHTML = "Max sub sum value(fast): " +
                new ArrayProcessingTool(inputArray).getMaxSubSumFast();
        }
    };

    var buttonGetSubSumSlow = function() {
        var inputString = document.getElementById("arrayInput").value;
        if(!checkInputString(inputString)) {
            alert("Please, check input string...")
        } else {
            var inputArray = splitInputStringToArray(inputString);
            document.querySelector("#result").innerHTML = "Max sub sum value(slow): " +
                new ArrayProcessingTool(inputArray).getMaxSubSumSlow();
        }
    };

    var buttonGetMaxIncreasingSequence = function() {
        var inputString = document.getElementById("arrayInput").value;
        if(!checkInputString(inputString)) {
            alert("Please, check input string...")
        } else {
            var inputArray = splitInputStringToArray(inputString);
            document.querySelector("#result").innerHTML = "Max Increasing value: " +
                new ArrayProcessingTool(inputArray).getMaxIncreasingSequence();
        }
    };

    document.querySelector("#arrayMax").addEventListener("click", buttonGetMaxValue);
    document.querySelector("#arrayMin").addEventListener("click", buttonGetMinValue);
    document.querySelector("#arrayMedian").addEventListener("click", buttonGetMedianValue);
    document.querySelector("#arraySubSumSlow").addEventListener("click", buttonGetSubSumSlow);
    document.querySelector("#arraySubSumFast").addEventListener("click", buttonGetSubSumFast);
    document.querySelector("#arrayMaxSequence").addEventListener("click", buttonGetMaxIncreasingSequence);
})();
