var SumEvent = new CustomEvent("SumEvent", {
	detail: {
		a: 1,
		b: 1
	}
})

var Sum = (function() {
		var cache = {};
		function f(a, b){
			var key = JSON.stringify(arguments);
			a = parseFloat(a);
			b = parseFloat(b);
			if(key in cache) {
				return cache[key];
			}
			var result = a + b;
			this.dispatchEvent(new CustomEvent("SumEvent",{
				detail: {
					a : a,
					b : b,
					sum: a + b,
					toString: a + " + " + b + "=" + result
				}
			}));
			cache[key] = result;
			return cache[key];
		}
		return f;
	})();

	var Sub = (function() {
		var cache = {};
		function f(a, b){
			var key = JSON.stringify(arguments);
			a = parseFloat(a);
			b = parseFloat(b);
			if(key in cache) {
				return cache[key];
			}
			this.dispatchEvent(new CustomEvent("SubEvent",{
				detail: {
					a : a,
					b : b,
					sum: b - a,
					toString: b + " - " + a + "=" + b - a
				}
			}));
			cache[key] = b - a;
			return cache[key];
		}
		return f;
	})();

	var Mul = (function() {
		var cache = {};
		function f(a, b){
			var key = JSON.stringify(arguments);
			a = parseFloat(a);
			b = parseFloat(b);
			if(key in cache) {
				return cache[key];
			}
			this.dispatchEvent(new CustomEvent("MulEvent",{
				detail: {
					a : a,
					b : b,
					sum: a * b,
					toString: a + " * " + b + "=" + a * b
				}
			}));
			cache[key] = a * b;
			return cache[key];
		}
		return f;
	})();

	var Div = (function() {
		var cache = {};
		function f(a, b){
			var key = JSON.stringify(arguments);
			a = parseFloat(a);
			b = parseFloat(b);
			if(key in cache) {
				return cache[key];
			}
			this.dispatchEvent(new CustomEvent("DivEvent",{
				detail: {
					a : a,
					b : b,
					sum: b / a,
					toString: + b + " / " + a + "=" + b / a
				}
			}));
			cache[key] = b / a;
			return cache[key];
		}
		return f;
	})();

function Calculator(polishNotation) {
	var lexems = polishNotation;
	var result = 0;

	this.Calc = function () {
		var stack = [];
		for (var i = 0; i < lexems.length; i++) {
			switch (lexems[i].GetLexema()) {
			case LEXEMA.NUM:
				stack.push(lexems[i].GetValue());
				break;
			case LEXEMA.OPERATOR:
				switch (lexems[i].GetValue()) {
				case "+":
					result = Sum(stack.pop(), stack.pop());
					break;
				case "-":
					result = Sub(stack.pop(), stack.pop());
					break;
				case "*":
					result = Mul(stack.pop(), stack.pop());
					break;
				case "/":
					result = Div(stack.pop(), stack.pop());
					break;
				}
				stack.push(result);
				break;
			}
		}
		return stack.pop();
	};
}