(function () {
    var lexema = new Lexem();
    lexema.SetValue(5);
    var lexicalTable = new LexicalAnalyzer("-6*6").Analyz();
    var polishNotation = new PolishNotation(lexicalTable).CreateNotation();
    for(var i = 0; i<polishNotation.length;i++){
        console.log(polishNotation[i].GetValue());
    }
    var result = new Calcuator(polishNotation).Calc();
    console.log(result);
}());