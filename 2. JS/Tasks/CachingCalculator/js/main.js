(function () {
	var checkNumber = function(expression) {
		var exp = /^[\d\.\+\*\/\-\(\)]+$/g;
		return exp.test(expression);
	}

	var checkOperator = function(expression) {
		var exp = /[+*/-]{2,}/g;
		return (expression.match(exp) || []).length === 0;
	}

	var checkInputExpression = function(expression) {
		if(!checkNumber(expression))
			throw "Please, check number in input expression";
		if(!checkOperator(expression))
			throw "Please, check operator in input expression";
	}

	var OutResult = function(expression, result) {
		document.querySelector("#result").innerHTML = expression + " = " + result;
	}

	var OutCache = function(event) {
		document.querySelector("#cache").innerHTML += " </br> " + event.detail.toString;
	}
	
	var calc = function() {
		try {
			var expression = document.querySelector("#inputExpression").value;
			checkInputExpression(expression);	
			var lexicalTable = new LexicalAnalyzer(expression).Analyz();
			var polishNotation = new PolishNotation(lexicalTable).CreateNotation();
			var result = new Calculator(polishNotation).Calc();
			OutResult(expression, result);
		} catch (error) {
			alert("Error! " + error);
			return;
		}
		
	}
	
	document.querySelector("#calcButton").addEventListener("click", calc);
	addEventListener("SumEvent", OutCache);
	addEventListener("SubEvent", OutCache);
	addEventListener("MulEvent", OutCache);
	addEventListener("DivEvent", OutCache);
}());