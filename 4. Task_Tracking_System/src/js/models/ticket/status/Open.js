import IStatus from "./IStatus";

class OpenStatus extends IStatus {
	GetStatus(){
		return "Open";
	}
}

export default OpenStatus;