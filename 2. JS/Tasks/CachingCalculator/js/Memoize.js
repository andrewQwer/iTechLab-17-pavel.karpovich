var memoize = function(fn ,resolver) {
	var memoized = function() {
		var key = JSON.stringify(Array.prototype.slice.call(arguments) + fn.name);
		return (key in cache) ? cache[key] : (cache[key] = fn.apply(this, arguments));
	}

	memoized.cache = {};

	return memoized;
};