import IObservable from "../models/observer/IObservable";
import WidgetUIController from "./UI/WidgetUIController";
import TicketController from "./TicketController";

let instance;
let observers = [];

class WidgetController extends IObservable {
	constructor(widgetList = []) {
		super();
		if (instance) {
			return instance;
		}
		instance = this;
		this._widgetList = widgetList;
		this._ticketController = new TicketController();
		this.RegisterObserver(new WidgetUIController());
	}

	get Widgets() {
		return this._widgetList;
	}

	GetWidgetById(id) {
		let result = null;
		for (let item of this._widgetList) {
			if (item.Id == parseInt(id)) {
				result = item;
			}
		}
		return result;
	}

	Add(widget) {
		widget.Tickets = this._ticketController.Tickets;
		this._widgetList.push(widget);
		this.NotifyObserver(widget);
	}

	Remove(id) {
		this._widgetList.splice(
			this._widgetList.indexOf(this.GetWidgetById(id)),
			1
		);
		this.NotifyObserver();
	}

	Edit(id, newWidgetValue) {
		let originalWidget = this.GetWidgetById(id);
		originalWidget.Tickets = newWidgetValue.tickets;
		originalWidget.Type = newWidgetValue.type;
		this.NotifyObserver();
	}

	RegisterObserver(observer) {
		observers.push(observer);
	}

	RemoveObserver(observer) {
		observers.splice(observers.indexOf(observer), 1);
	}

	NotifyObserver(widget) {
		for (let item of observers) {
			item.Update(widget);
		}
	}
}

export default WidgetController;
