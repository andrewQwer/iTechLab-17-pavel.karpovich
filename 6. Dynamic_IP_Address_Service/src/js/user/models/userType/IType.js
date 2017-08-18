import Admin from "./Admin";
import SimpleUser from "./SimpleUser";
import PremiumUser from "./PremiumUser";

export default class IType {
	GetDomainCount(type){
		if(type == "Admin") {
			return new Admin().GetDomainCount();
		} else if (type == "SimpleUser") {
			return new SimpleUser().GetDomainCount();
		} else if (type == "PremiumUser") {
			return new PremiumUser().GetDomainCount();
		}
	}
	GetType(){}
}