function Calculator(polishNotation) {
	var lexems = polishNotation;
	var result = 0;

	var Sum = function (a, b) {
		return parseFloat(a) + parseFloat(b);
	};

	var Sub = function (a, b) {
		return parseFloat(a) - parseFloat(b);
	};

	var Div = function (a, b) {
		return parseFloat(a) / parseFloat(b);
	};

	var Mul = function (a, b) {
		return parseFloat(a) * parseFloat(b);
	};

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