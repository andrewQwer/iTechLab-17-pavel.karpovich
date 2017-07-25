import OpenStatus from "./status/Open";
import ClosedStatus from "./status/Closed";
import InProgressStatus from "./status/InProgress";

class Ticket {
	constructor(id, title, dueData, status) {
		this._id = id;
		this._title = title;
		this._dueData = dueData;
		this._status = this.switchStatus(status);
	}

	get Id() {
		return this._id;
	}

	get Title() {
		return this._title;
	}

	set Title(title) {
		this._title = title;
	}

	get Status() {
		return this._status.GetStatus();
	}

	set Status(status) {
		this._status = this.switchStatus(status);
	}

	get DueData() {
		return this._dueData;
	}

	set DueData(dueData) {
		this._dueData = dueData;
	}

	switchStatus(statusString) {
		let result;
		switch (statusString) {
			case "Open":
				result = new OpenStatus();
				break;
			case "Closed":
				result = new ClosedStatus();
				break;
			case "InProgress":
				result = new InProgressStatus();
				break;
		}
		return result;
	}
}

export default Ticket;
