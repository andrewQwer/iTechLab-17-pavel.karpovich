export default class Role {
    constructor(name, domainCount) {
        this.name = name;
        this.domainCount = domainCount;
    }

    get Name() {
        return this.name;
    }

    set Name(value) {
        this.name = value;
    }

    get DomainCount() {
        return this.domainCount
    }

    set DomainCount(value) {
        this.domainCount = value;
    }
}