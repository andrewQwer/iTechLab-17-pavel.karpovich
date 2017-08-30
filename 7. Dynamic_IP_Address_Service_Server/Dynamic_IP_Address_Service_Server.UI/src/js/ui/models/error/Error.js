export default class Error {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    get Message() {
        return this.message;
    }

    set Message(msg) {
        this.message = msg;
    }

    get Code() {
        return this.code;
    }

    set Code(code) {
        this.code = code;
    }
} 