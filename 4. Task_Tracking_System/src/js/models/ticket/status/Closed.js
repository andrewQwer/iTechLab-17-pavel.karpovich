import IStatus from "./IStatus";

class ClosedStatus extends IStatus {
	GetStatus(){
		return "Closed";
	}
}

export default ClosedStatus;