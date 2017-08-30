export default class Notification {
    constructor(msg) {
        this.message = msg;
    }

    get Message() {
        return this.message;
    }

    set Message(msg) {
        this.message = msg;
    }
}