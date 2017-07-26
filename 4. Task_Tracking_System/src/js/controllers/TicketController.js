import IObservable from "../models/observer/IObservable";
import TicketUIController from "./UI/TicketUIController";
import WidgetUIController from "./UI/WidgetUIController";
let instance = null;
let observerList = [];

class TicketController extends IObservable {
	constructor(ticketList = []) {
		super();
		if (instance) {
			return instance;
		}
		instance = this;
		this.ticketList = ticketList;
		this.RegisterObserver(new TicketUIController());
		this.RegisterObserver(new WidgetUIController());
	}

	get Tickets() {
		return this.ticketList;
	}

	Add(ticket) {
		this.ticketList.push(ticket);
		this.NotifyObserver(ticket);
	}

	Remove(id) {
		this.ticketList.splice(
			this.ticketList.lastIndexOf(this.GetTicketById(id)),
			1
		);
		this.NotifyObserver();
	}

	Edit(id, newTicketValue) {
		let ticket = this.GetTicketById(id);
		ticket.Title = newTicketValue.title;
		ticket.DueDate = newTicketValue.dueDate;
		ticket.Status = newTicketValue.status;
		this.NotifyObserver();
	}

	GetTicketById(id) {
		let result;
		for (let item of this.ticketList) {
			result = item.Id == parseInt(id) ? item : null;
		}
		return result;
	}

	Display() {
		for (let item of this.ticketList) {
			console.log(item);
		}
	}

	RegisterObserver(observer) {
		observerList.push(observer);
	}

	RemoveObserver(observer) {
		observerList.splice(observerList.lastIndexOf(observer), 1);
	}

	NotifyObserver(ticket) {
		for (let item of observerList) {
			item.Update(ticket);
		}
	}
}

export default TicketController;
