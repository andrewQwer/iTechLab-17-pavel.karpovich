/**
 * Created by taller on 7/15/2017.
 */
(function () {
    Array.prototype.swap = function (x, y) {
        var temp = this[y];
        this[y] = this[x];
        this[x] = temp;
    };

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



    var inputArray = [12, 11, 5, 99, 81, 17, 6, 5, 4, 3, 2, 1];
    console.log(inputArray);
    //console.log(new ArraySorter().InsertSort(inputArray));
    //console.log(new ArraySorter().BubbleSort(inputArray));
    //console.log(new ArraySorter().QuickSort(inputArray));
    console.log(new ArraySorter().SelectSort(inputArray));



})();
