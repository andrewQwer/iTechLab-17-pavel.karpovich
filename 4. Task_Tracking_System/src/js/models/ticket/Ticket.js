class Ticket {
	constructor(title, dueData, status) {
		this.status = status;
		this.title = title;
		this.dueData = dueData;
	}

	get Title() {
		return this.status;
	}

	set Title(title) {
		this.title = title;
	}

	get Status() {
		return this.status;
	}

	set Status(status) {
		this.status = status;
	}

	get DueData() {
		return this.dueData;
	}

	set DueData(dueData) {
		this.dueData = dueData;
	}
}

export default Ticket;