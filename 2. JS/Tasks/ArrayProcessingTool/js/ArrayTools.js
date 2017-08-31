var ArrayTools = function() {
	var getSorted = function (array) {
		var sortedArray = array.slice();
		return sortedArray.sort(function (a, b) {
			return a - b
		});
	};
	
	this.getMaxSubSumFast = function (array) {
		var sum = 0;
		var maxSum = 0;
		array.forEach(function (element, index, array) {
			sum += parseInt(element);
			maxSum = Math.max(maxSum, sum);
			sum = (sum < 0) ? 0 : sum;
		});
		return maxSum;
	};
	
	this.getMaxSubSumSlow = function (array) {
		var maxSum = 0;
		for (var i = 0; i < array.length; i++) {
			var sum = 0;
			for (var k = i; k < array.length; k++) {
				sum +=  parseInt(array[k]);
				maxSum = Math.max(maxSum, sum);
			}
		}
		return maxSum;
	};
	
	this.getMax = function (array) {
		return getSorted(array)[array.length - 1];
	};
	
	this.getMin = function (array) {
		return getSorted(array)[0];
	};
	
	this.getMedian = function (array) {
		var half = Math.floor(array.length / 2);
		return (array.length % 2 !== 0) ?
		getSorted(array)[half] : (getSorted(array)[half - 1] + getSorted(array)[half]) / 2;
	};
	
	this.getMaxIncreasingSequence = function (array) {
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