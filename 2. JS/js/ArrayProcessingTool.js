/**
 * Created by pavel.karpovich on 7/14/2017.
 */
(function () {
    function ArrayProcessingTool() {
        var array = [];

        for (var i = 0; i < arguments.length; i++) {
            array.push(parseInt(arguments[i]));
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

    var array = new ArrayProcessingTool(2, -1, "2", 3, -9);
    console.log("Array: " + array.getArray());
    console.log("Max:" + array.getMax());
    console.log("Min: " + array.getMin());
    console.log("Median: " + array.getMedian());
    console.log("MaxSubSum: " + array.getMaxSubSumFast());
    console.log("MaxSubSum: " + array.getMaxSubSumSlow());
    console.log("MaxSequence: " + array.getMaxIncreasingSequence());
    console.log("Array: " + array.getArray());

})();
