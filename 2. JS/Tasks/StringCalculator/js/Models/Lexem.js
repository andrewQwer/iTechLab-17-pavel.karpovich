var LEXEMA = {
    NULL: {
        value: -1
    },
    OPERATOR: {
        value: 1
    },
    NUM: {
        value: 2
    },
};

function Lexem(lexema, value) {
    var _lexema = lexema;
    var _priority = -1;
    var _value = value;

    this.SetLexema = function (value) {
        _lexema = value;
    };

    this.GetLexema = function () {
        return _lexema;
    };

    this.SetPriority = function (value) {
        switch (value) {
                case ')':
                case '(':
                    _priority = 0;
                    break;
                case '+':
                case '-':
                    _priority = 1;
                    break;
                case '*':
                case '/':
                    _priority = 2;
                    break;
                default:
                    _priority = 0;
                    break;
            }
    };

    this.GetPriority = function () {
        return _priority;
    };

    this.SetValue = function (value) {
        _value = value;
    };

    this.GetValue = function () {
        return _value;
    };
}