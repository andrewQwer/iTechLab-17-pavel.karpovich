function LexicalAnalyzer(input) {
    var _inputString = input;
    var lexems = [];

    var IsNum = function (char) {
        return (/(\d|\.)/).test(char);
    };

    var BracketCheck = function () {
        var bracketCount = 0;
        for(var i = 0; i < _inputString.length; i++) {
            if(_inputString[i] === '(')
                bracketCount++;
            if(_inputString[i] === ')')
                bracketCount--;
        }
        return bracketCount === 0;
    } 

    var GetFirstNumFromPosition = function (startPosition) {
        var searchString = _inputString.substring(startPosition, _inputString.length);
        var result = searchString.match(/-?(\d|\.)+/)[0];
        //startPosition += --result.length; // because string length start with zero
        return result;
    };

    var CreateOperatorLexem = function (index) {
        var lexema = new Lexem(LEXEMA.OPERATOR, _inputString[index]);
        lexema.SetPriority(_inputString[index]);
        return lexema;
    };

    var CreateNumLexem = function (index) {
        return new Lexem(LEXEMA.NUM, GetFirstNumFromPosition(index));
    };

    this.Analyz = function () {
        if(!BracketCheck())
            throw "Please, check count of bracket";
        for (var i = 0; i < _inputString.length; i++) {
            var lexema;
            if (IsNum(_inputString[i])) {
                lexema = CreateNumLexem(i);
                i += --lexema.GetValue().length;
            } else {
                if ((i === 0 || _inputString[i - 1] === '(') && _inputString[i] === '-') {   // check to negative value
                    lexema = CreateNumLexem(i);
                    i += --lexema.GetValue().length;
                } else {
                    lexema = CreateOperatorLexem(i);
                }                
            }
            lexems.push(lexema);
        }
        return lexems;
    };
}