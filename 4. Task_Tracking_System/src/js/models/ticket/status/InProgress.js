import IStatus from "./IStatus";

class InProgressStatus extends IStatus {
	GetStatus() {
		return "InProgress";
	}
}

export default InProgressStatus;