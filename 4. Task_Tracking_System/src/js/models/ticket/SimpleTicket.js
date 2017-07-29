import Ticket from "./Ticket";
import DateTime from "../../helpers/DateTime"

class SimpleTicket extends Ticket {
	constructor(id, title, dueDate, status) {
		super(id, title, dueDate, status);
	}
	
	toString() {
		return `<li class="row ticket__item" guid="${this.Id}">
		<div class="col-md-4">${this.Title}</div>
		<div class="col-md-3">${DateTime.GetFullDate(this.DueDate)}</div>
		<div class="col-md-3">${this.Status}</div>
		<div class="col-md-1">
			<button class="btn btn-danger ticketDeleteButton">Delete</button>
		</div>
		<div class="col-md-1">
			<button class="btn btn-info ticketEditButton">Edit</button>
		</div>
		</li>`;
	}
}

export default SimpleTicket;
