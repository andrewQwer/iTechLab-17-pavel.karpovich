import TicketController from "../TicketController";
import SimpleTicket from "../../models/ticket/SimpleTicket";
import IObserver from "../../models/observer/IObserver";

let instance;

let $ticketList = $("#ticketList");
let $ticketInputTitle = $("#ticketTitle");
let $ticketInputDueDate = $("#ticketDueDate");
let $ticketInputStatus = $("#ticketStatus");
let $addTicketMenu = $("#addTicketMenu");
let $ticketAddButton = $("#addTicketButton");
let $ticketSaveButton = $("#saveTicketButton");
let $ticketSaveEditButton = $("#editTicketButton");
let $ticketDeleteButton = $("#ticketDeleteButton");
let $ticketEditButton = $("#ticketEditButton");

let ticketsId = 0;
let editId = 0;

class TicketUIController extends IObserver {
	constructor() {
		super();
		if (instance) {
			return instance;
		}
		instance = this;
		this.PlugEvent();
		this.ticketController = new TicketController();
	}

	PlugEvent() {
		$ticketAddButton.click(() => $addTicketMenu.show());
		$ticketSaveButton.click(() => this.AddTicket());
		$ticketSaveEditButton.click(() => this.SaveEditTicket());
		$("body").on("click", ".ticketDeleteButton", () => {
			this.DeleteTicket(this.GetSelectedId(event));
		});
		$("body").on("click", ".ticketEditButton", () => {
			editId = this.GetSelectedId(event);
			this.EditTicket(editId);
		});
	}

	get TicketMenuValue() {
		return {
			title: $ticketInputTitle.val(),
			dueData: new Date($ticketInputDueDate.value),
			status: $("#ticketStatus option:selected").val()
		};
	}

	set TicketMenuValue({ title, dueData, status }) {
		$ticketInputTitle.val(title);
		$ticketInputDueDate.val(dueData);
		$ticketInputStatus.val(status);
	}

	GetSelectedId(event) {
		return event.target.closest(".ticket__item").attributes["guid"].value;
	}

	AddTicket() {
		let ticketMenuValue = this.TicketMenuValue;
		this.ticketController.Add(
			new SimpleTicket(
				ticketsId++,
				ticketMenuValue.title,
				ticketMenuValue.dueData,
				ticketMenuValue.status
			)
		);
		alert("Ticket successfully added !");
		this.TicketMenuValue = { title: "", dueData: "", status: "default" };
		$addTicketMenu.hide();
	}

	DeleteTicket(id) {
		this.ticketController.Remove(id);
		alert("Ticket successfully delete!");
	}

	EditTicket(id) {
		let editTicket = this.ticketController.GetTicketById(id);
		this.TicketMenuValue = {
			title: editTicket.Title,
			dueData: editTicket.DueDate,
			status: editTicket.Status
		};
		$addTicketMenu.show();
	}

	SaveEditTicket() {
		this.ticketController.Edit(editId, this.TicketMenuValue);
		$addTicketMenu.hide();
		alert("Ticket change successfully!");
	}

	Update() {
		let result = "";
		for (let item of this.ticketController.ticketList) {
			result += item.toString();
		}
		$ticketList.html(result);
	}
}

export default TicketUIController;
