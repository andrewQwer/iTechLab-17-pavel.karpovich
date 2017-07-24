let Currying = func => {
	var curryArgs = [];
	return function Curry(arg) {
		curryArgs.push(arg);
		return func.length <= curryArgs.length
			? func.apply(null, curryArgs)
			: Curry;
	};
};

export default Currying;