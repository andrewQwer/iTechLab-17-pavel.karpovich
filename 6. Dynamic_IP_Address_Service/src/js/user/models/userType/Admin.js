import IType from "./IType";

export default class Admin extends IType {
	constructor(){
		super(null)
	}

	GetDomainCount() {
		return 999;
	}

	GetType() {
		return "Admin";
	}
}