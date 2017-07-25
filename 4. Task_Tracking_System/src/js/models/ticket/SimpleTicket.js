import Ticket from "./Ticket";

class SimpleTicket extends Ticket {
	constructor(title, dueData, status){
		super(title, dueData, status);
	}
}

export default SimpleTicket;