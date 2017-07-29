import TicketController from "./TicketController";
import WidgetController from "./WidgetController";
import SimpleTicket from "../models/ticket/SimpleTicket";
import SimpleWidget from "../models/widget/SimpleWidget";

class StartupInit {
	constructor() {
		let ticket = new TicketController();
		let widget = new WidgetController();
		ticket.Add(
			new SimpleTicket(800, "test1", new Date(2017, 7, 6, 9, 0), "Open")
		);
		ticket.Add(
			new SimpleTicket(801, "test2", new Date(2017, 11, 13, 9, 0), "Closed")
		);
		ticket.Add(
			new SimpleTicket(802, "test3", new Date(2018, 0, 26, 9, 0), "InProgress")
		);
		ticket.Add(
			new SimpleTicket(804, "test4", new Date(2018, 2, 10, 9, 0), "Open")
		);
		ticket.Add(
			new SimpleTicket(804, "test5", new Date(2018, 3, 26, 9, 0), "Closed")
		);
		widget.Add(
			new SimpleWidget(800, "BarChart", "3px", "black", "black", ticket.Tickets)
		);
		widget.Add(
			new SimpleWidget(800, "PieChart", "5px", "green", "white", ticket.Tickets)
		);
		widget.Add(
			new SimpleWidget(800, "List", "7px", "red", "blue", ticket.Tickets)
		);
		
	}
}

export default StartupInit;
