let Lazy = function(func) {
	return func.bind.apply(func, arguments);
};

export default Lazy;