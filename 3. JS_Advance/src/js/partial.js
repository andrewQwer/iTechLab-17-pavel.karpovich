let Partial = (func, ...partialArgs) => (...args) =>
	func.apply(this, partialArgs.concat(args));

export default Partial;
