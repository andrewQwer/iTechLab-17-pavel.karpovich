import IType from "./IType";

export default class Admin extends IType {
	GetDomainCount() {
		return 999;
	}

	GetType() {
		return "Admin";
	}
}