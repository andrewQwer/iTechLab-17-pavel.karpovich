import Ticket from "./Ticket";

class SimpleTicket extends Ticket {
	constructor(id, title, dueData, status) {
		super(id, title, dueData, status);
	}
	
	toString() {
		return `<div class="row ticket__item" guid="${this.Id}">
		<div class="col-md-4">${this.Title}</div>
		<div class="col-md-3">${this.DueData}</div>
		<div class="col-md-3">${this.Status}</div>
		<div class="col-md-1">
			<a class="btn btn-danger ticketDeleteButton" role="button">delete</a>
		</div>
		<div class="col-md-1">
			<a class="btn btn-info ticketEditButton" role="button">edit</a>
		</div>
		</div>`;
	}
}

export default SimpleTicket;
