(function() {
	let Currying = func => {
		var curryArgs = [];
		return function Curry(arg) {
			curryArgs.push(arg);
			return func.length <= curryArgs.length
				? func.apply(null, curryArgs)
				: Curry;
		};
	};

	let log = (a, b, c, d, e, g) => console.log(a, b, c, d, e, g);

	Currying(log)(2)(3)(4)(5)(6)(7);
})();
