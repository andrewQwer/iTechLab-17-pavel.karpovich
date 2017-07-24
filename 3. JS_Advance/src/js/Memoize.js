let Memoize = func => {
	let cache = {};

	return (...args) => {
		let key = JSON.stringify(args);
		return key in cache ? cache[key] : (cache[key] = func.apply(this, args));
	};
};

export default Memoize;
