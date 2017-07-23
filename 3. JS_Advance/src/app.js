import Partial from "./js/Partial";
import Currying from "./js/Currying";
import Fold from "./js/Fold";
import Unfold from "./js/Unfold";
import Map from "./js/Map";
import Filter from "./js/Filter";
import First from "./js/First";
import Lazy from "./js/Lazy";
import Memoize from "./js/Memoize";

let test = Fold(
	[2, 3, 4, 5, 6, 7, 8, 9],
	(prev, current, index, array) => (prev *= current),
	1
);

console.log(`Mul array result = ${test}`);
