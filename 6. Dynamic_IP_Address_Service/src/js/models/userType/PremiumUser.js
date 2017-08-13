import IType from "./IType";

export default class PremiumUser extends IType {
	GetDomainCount() {
		return 5;
	}

	GetType() {
		return "PremiumUser";
	}
}