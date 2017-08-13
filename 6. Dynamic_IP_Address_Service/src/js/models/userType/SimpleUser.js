import IType from "./IType";

export default class SimpleUser extends IType {
	GetDomainCount() {
		return 1;
	}

	GetType() {
		return "SimpleUser";
	}
}