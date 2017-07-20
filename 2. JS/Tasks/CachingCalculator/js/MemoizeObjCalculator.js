function MemoizeObjCalculator(polishNotation) {
	var lexems = polishNotation;
	var result = 0;

	var Sum = memoize(function sum(a, b) {
		var result = parseFloat(a) + parseFloat(b);
		this.dispatchEvent(new CustomEvent("SumEvent",{
				detail: {
					toString: a + " + " + b + "=" + result
				}
			}));
		return result;
	});

	var Sub = memoize(function sub(a, b) {
		result = parseFloat(b) - parseFloat(a);
		this.dispatchEvent(new CustomEvent("SubEvent",{
				detail: {
					toString: b + " - " + a + "=" + result
				}
			}));
		return result;
	});

	var Div = memoize(function div(a, b) {
		this.dispatchEvent(new CustomEvent("DivEvent",{
				detail: {
					toString: b + " / " + a + "=" + b/a
				}
			}));
		return parseFloat(b) / parseFloat(a);
	});

	var Mul = memoize(function mul(a, b) {
		this.dispatchEvent(new CustomEvent("MulEvent",{
				detail: {
					toString: a + " * " + b + "=" + a*b
				}
			}));
		return parseFloat(a) * parseFloat(b);
	});

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