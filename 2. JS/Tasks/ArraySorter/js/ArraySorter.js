function ArraySorter() {
	this.BubbleSort = function (array) {
		var isSwap;
		do {
			isSwap = false;
			array.forEach(function (element, index, sourceArray) {
				if (element > sourceArray[index + 1]) {
					sourceArray.swap(index, index + 1);
					isSwap = true;
				}
			})
		} while (isSwap)
		return array;
	};
	
	this.InsertSort = function (array) {
		for (var i = 1; i < array.length; i++) {
			for (var j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
				array.swap(j, j + 1);
			}
		}
		return array;
	};
	
	this.QuickSort = function (array) {
		if (array.length <= 1) {
			return array;
		}
		var pivot = array[0];
		var left = [];
		var right = [];
		for (var i = 1; i < array.length; i++) {
			array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
		}
		return this.QuickSort(left).concat(pivot, this.QuickSort(right));
	}
	
	this.SelectSort = function (array) {
		for (var i = 0; i < array.length - 1; i++) {
			var minIndex = i;
			for (var j = i + 1; j < array.length; j++) {
				minIndex = (array[minIndex] > array[j]) ? j : minIndex;
			}
			array.swap(i, minIndex);
		};
		return array;
	}
}
