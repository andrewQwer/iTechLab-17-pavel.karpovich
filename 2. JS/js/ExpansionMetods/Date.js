Date.prototype.format = function (format) {
    var month = ["January", "Febreary", "Marth", "April", "May", "June", "Jule",
        "August", "September", "October", "November", "December"
    ];

    var dataFormatRegex = {
        "y{4}": this.getFullYear(),
        "M{4}": month[this.getMonth() - 1],
        "M{2}": this.getMonth(),
        "d{2}": this.getDate(),
    };

    for (var regex in dataFormatRegex) {
        if (new RegExp("(" + regex + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                dataFormatRegex[regex] : ("00" + dataFormatRegex[regex]).substr(("" + dataFormatRegex[regex]).length));
        }
    }
    return format;
};