import IObserver from "../observer/IObserver";
import BarChart from "./Type/BarChart";
import List from "./Type/List";
import PieChart from "./Type/PieChart";

class Widget extends IObserver {
	constructor(id, type, borderWidth, borderColor, textColor, ticketList) {
		super();
		this._id = id;
		this.Type = type;
		this._borderWidth = borderWidth;
		this._borderColor = borderColor;
		this._textColor = textColor;
		this._ticketList = ticketList;
	}

	get Id() {
		return this._id;
	}

	get Type() {
		return this._type.GetType();
	}

	set Type(type) {
		this._type = this.SwitchType(type);
	}

	get Tickets() {
		return this._ticketList;
	}

	set Tickets(tickets) {
		this._ticketList = tickets;
	}

	get Tickets() {
		return this._ticketList;
	}

	get BorderWidth() {
		return  parseInt(this._borderWidth);
	}

	get BorderColor() {
		return this._borderColor;
	}

	get TextColor() {
		return this._textColor;
	}

	Add(ticket) {
		this.ticketList.push(ticket);
	}

	Remove(ticket) {
		this.ticketList.splice(this.ticketList.lastIndexOf(ticket), 1);
	}

	Display() {
		for (let item of this.ticketList) {
			console.log(item);
		}
	}

	CalculatePercent() {
		let ticketCount = this._ticketList.length;
		let closedCount = 0;
		let inProgressCount = 0;
		let openCount = 0;
		for (let item of this._ticketList) {
			switch (item.Status) {
				case "Closed":
					closedCount++;
					break;
				case "Open":
					openCount++;
					break;
				case "InProgress":
					inProgressCount++;
					break;
			}
		}
		return {
			count: ticketCount,
			closedPercent: closedCount * 100 / ticketCount,
			openPercent: openCount * 100 / ticketCount,
			inProgressPercent: inProgressCount * 100 / ticketCount
		};
	}

	SwitchType(type) {
		let result;
		switch (type) {
			case "BarChart":
				result = new BarChart();
				break;
			case "List":
				result = new List();
				break;
			case "PieChart":
				result = new PieChart();
				break;
			default:
				throw "Was selected incorrect type of widget!";
		}
		return result;
	}
}

export default Widget;
