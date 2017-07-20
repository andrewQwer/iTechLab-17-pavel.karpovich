QUnit.test("LexicalAnalyzer", function(assert) {
  var analyze = new LexicalAnalyzer("22+36*9").Analyz();
  assert.equal(analyze.length, 5, "Lexical analyzer result length");
  assert.deepEqual(analyze[0].GetLexema(), LEXEMA.NUM, "get lexem");
  assert.deepEqual(analyze[1].GetLexema(), LEXEMA.OPERATOR, "get lexem");
  assert.deepEqual(analyze[2].GetValue(), "36", "get lexem value");
  assert.deepEqual(analyze[3].GetPriority(), 2, "get operator priority");
  assert.throws(
    function() {
      new LexicalAnalyzer("(22+36*9").Analyz();
    },
    function(error) {
      return error.toString() === "Please, check count of bracket";
    },
    "Check count of bracket"
  );
});

QUnit.test("PolishNotation", function(assert) {
  var notation = new PolishNotation(new LexicalAnalyzer("22+33*9").Analyz()).CreateNotation();

  assert.equal(notation.length, 5, "result array length");
  assert.deepEqual(notation[0].GetLexema(), LEXEMA.NUM, "lexem order");
  assert.notDeepEqual(notation[1].GetLexema(), LEXEMA.OPERATOR, "lexem order");
  assert.deepEqual(notation[3].GetLexema(), LEXEMA.OPERATOR, "lexem order");
  assert.deepEqual(notation[3].GetPriority(), 2, "lexem order priority");
});

QUnit.test("Calculator", function(assert) {
  assert.equal(new Calculator(new PolishNotation(new LexicalAnalyzer("2+2").Analyz()).CreateNotation()).Calc(), 4, "sum");
  assert.equal(new Calculator(new PolishNotation(new LexicalAnalyzer("2-2").Analyz()).CreateNotation()).Calc(), 0, "sub");
  assert.equal(new Calculator(new PolishNotation(new LexicalAnalyzer("2*10").Analyz()).CreateNotation()).Calc(), 20, "mul");
  assert.equal(new Calculator(new PolishNotation(new LexicalAnalyzer("100/50").Analyz()).CreateNotation()).Calc(), 2, "div");
  assert.equal(new Calculator(new PolishNotation(new LexicalAnalyzer("1000+9856-7854").Analyz()).CreateNotation()).Calc(), 3002, "mixed");
  assert.equal(new Calculator(new PolishNotation(new LexicalAnalyzer("1000+9856-7854*5/12.5").Analyz()).CreateNotation()).Calc(), 7714.4, "mixed");
})
