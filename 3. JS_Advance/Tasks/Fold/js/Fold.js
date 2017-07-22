(function(){
function Fold(array, callback, initialValue){
	let previousValue = initialValue, currentValue, index;
	for(let i = 0; i < array.length;i++) {
		currentValue = array[i];
		index = i;
		previousValue = callback.call(null, previousValue, currentValue, index, array);
	}

	return previousValue;
}

let fold = Fold([1,2,3,4,5,6,7,8,9], function(prev, current, index, array){
	console.log(`prev = ${prev} current = ${current} index = ${index}, array = ${array}`);
	return prev + current;
}, 0)

console.log(fold);
})();