function PolishNotation(lexicalTable) {
	var lexems = lexicalTable;

	this.CreateNotation = function () {
		var outputLexems = [];
		var stack = [];
		for (var i = 0; i < lexems.length; i++) {
			switch (lexems[i].GetLexema()) {
			case LEXEMA.NUM:
				outputLexems.push(lexems[i]);
				break;
			case LEXEMA.OPERATOR:
				switch (lexems[i].GetValue()) {
				case "(":
					stack.push(lexems[i]);
					break;
				case ")":
					var element = stack.pop();
					while (stack.length !== 0 && element.GetValue() !== "(") {
						outputLexems.push(element);
						element = stack.pop();
					}
					break;
				default:
					while (lexems[i].GetPriority() < (stack.length !== 0 && stack.peek().GetPriority())) {
						outputLexems.push(stack.pop());
					}
					stack.push(lexems[i]);
					break;
				}
				break;
			}
		}
		while (stack.length !== 0) {
			outputLexems.push(stack.pop());
		}
		return outputLexems;
	};
}