import IObserver from "../observer/IObserver";

class Widget extends IObserver{
	constructor(type, ticketList) {
		super();
		this.ticketList = ticketList;
		this.type = type;
	}

	Add(ticket) {
		this.ticketList.push(ticket);
	}

	Remove(ticket) {
		this.ticketList.splice(this.ticketList.lastIndexOf(ticket), 1);
	}

	Display(){
		for(let item of this.ticketList) {
			console.log(item);
		}
	}
}

export default Widget;