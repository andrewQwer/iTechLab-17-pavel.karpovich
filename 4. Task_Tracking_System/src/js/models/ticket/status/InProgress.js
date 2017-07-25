import IStatus from "./IStatus";

class InProgressStatus extends IStatus {
	GetType() {
		return "InProgress";
	}
}

export default InProgressStatus;