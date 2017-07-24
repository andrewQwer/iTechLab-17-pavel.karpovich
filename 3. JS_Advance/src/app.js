import Partial from "./js/Partial";
import Currying from "./js/Currying";
import Fold from "./js/Fold";
import Unfold from "./js/Unfold";
import Map from "./js/Map";
import Filter from "./js/Filter";
import First from "./js/First";
import Lazy from "./js/Lazy";
import Memoize from "./js/Memoize";

let GetRandomInt = () => Math.floor(Math.random() * (99 - 1)) + 1;

let Mul = (...args) => {
	let result = 1;
	for (let item of args) {
		result *= item;
	}
	return result;
};

function Sum(a, b, c, d) {
	let result = 0;
	for (let item of arguments) {
		result += item;
	}
	return result;
}

let PartialMul2 = Partial(Mul, 2, 10);

let inputArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let PartialFold = Partial(Fold, Filter(inputArray, item => item % 2 == 0));
let averageOfEvenNumbers =
	PartialFold((prev, current) => (prev += current), 0) /
	PartialFold(prev => ++prev, 0);

let sumOfRandomNumbers = Fold(
	Unfold(current => [GetRandomInt(), current++ <= 10 ? current : false], 1),
	(prev, current) => (prev += current),
	0
);

document.querySelector(
	".partial"
).innerHTML = `PartialMul, fixed 2 and 10, mul on 5 = ${PartialMul2(5)}`;
document.querySelector(
	".currying"
).innerHTML = `CurryingSum(1)(7)(10)(5) = ${Currying(Sum)(1)(7)(10)(5)}`;
document.querySelector(".fold").innerHTML = `Fold([1,2,3,4]) = ${Fold(
	[1, 2, 3, 4],
	(prev, current, index, array) => (prev *= current),
	1
)}`;
document.querySelector(
	".unfold"
).innerHTML = `Unfold between 1 to 10 = ${Unfold(
	current => [current, current++ <= 10 ? current : false],
	1
)}`;
document.querySelector(
	".map"
).innerHTML = `String length ["taller", "liza", "max"] =  ${Map(
	["taller", "liza", "max"],
	item => item.length
)}`;
document.querySelector(
	".filter"
).innerHTML = `Only even between 0 to 10 = ${Filter(
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	item => item % 2 == 0
)}`;
document.querySelector(".first").innerHTML = `First number > 5 = ${First(
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	item => item > 5
)}`;
document.querySelector(
	".avg"
).innerHTML = `Average of even numbers between 0 to 10 = ${averageOfEvenNumbers}`;
document.querySelector(
	".randomSum"
).innerHTML = `SumOfRandomNumbers = ${sumOfRandomNumbers}`;
