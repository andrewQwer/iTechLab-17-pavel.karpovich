import IStatus from "./IStatus";

class ClosedStatus extends IStatus {
	GetType(){
		return "Closed";
	}
}

export default ClosedStatus;